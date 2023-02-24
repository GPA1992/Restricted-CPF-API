import { NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import AuthMiddleware from '../auth/auth';

chai.use(chaiHttp);
const expect = chai.expect;

describe('AuthMiddleware', () => {
    const secret = 'jwt_secret';
    const jwtConfig = {
        expiresIn: '999d',
        algorithm: 'HS256',
    };
    describe('tokenHandle', () => {
        afterEach(() => {
            sinon.restore();
        });
        it('deve retornar um erro 401 quando o token não for enviado', () => {
            const req = { header: sinon.stub().returns(null) };
            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            const next = sinon.stub();

            AuthMiddleware.tokenHandle(req as any, res as any, next as NextFunction);

            expect(req.header.calledOnceWith('Authorization')).to.be.true;

            expect(res.status.calledOnceWith(401)).to.be.true;

            expect(res.json.calledOnceWith({ message: 'Token not found' })).to.be.true;

            expect(next.notCalled).to.be.true;
        });

        it('deve retornar um erro 401 quando o token não for válido', () => {
            const invalidToken = jwt.sign({ name: 'admin' }, 'invalid_secret', jwtConfig);

            const req = { header: sinon.stub().returns(invalidToken) };
            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            const next = sinon.stub();

            AuthMiddleware.tokenHandle(req as any, res as any, next as NextFunction);

            expect(req.header.calledOnceWith('Authorization')).to.be.true;

            expect(res.status.calledOnceWith(401)).to.be.true;

            expect(res.json.calledOnceWith({ message: 'Token must be a valid token' })).to.be.true;

            expect(next.notCalled).to.be.true;
        });

        it(`deve adicionar as informações do usuário ao corpo da
     solicitação e chamar o próximo middleware quando o token for válido`, () => {
            const user = { name: 'root', role: 'admin' };
            const token = jwt.sign({ ...user }, secret, jwtConfig);

            const req = { header: sinon.stub().returns(token), body: {} };
            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

            const next = sinon.stub();

            AuthMiddleware.tokenHandle(req as any, res as any, next as NextFunction);

            const decoded = jwt.verify(req.header('Authorization') as string, secret);
            const payloadUser = { name: decoded.name, role: decoded.role };

            expect(payloadUser).to.eql(user);

            expect(res.status.notCalled).to.be.true;

            expect(res.json.notCalled).to.be.true;

            expect(next.calledOnce).to.be.true;
        });
    });
});
