import { Request, Response } from 'express';
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import { LoginController } from '../../controllers';
import { UserServices } from '../../services';
import { UserType } from '../../types/types';

chai.use(chaiHttp);
const expect = chai.expect;

describe('LoginController', () => {
    const secret = 'jwt_secret';
    const jwtConfig = {
        expiresIn: '999d',
        algorithm: 'HS256',
    };

    describe('login', () => {
        afterEach(function () {
            sinon.restore();
        });
        it('deve retornar um token JWT quando passar credenciais de usuário válidas', async () => {
            const user = { name: 'admin', role: 'admin' };
            const token = jwt.sign({ ...user }, secret, jwtConfig);

            const req = { body: { name: 'admin' } };
            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

            const findByNameStub = sinon.stub(UserServices, 'findByName').resolves(user as UserType);

            await LoginController.login(req as Request, res as any);

            expect(findByNameStub.calledOnceWith('admin')).to.be.true;

            expect(jwt.sign({ ...user }, secret, jwtConfig)).to.equal(token);

            expect(res.status.calledOnceWith(200)).to.be.true;

            expect(res.json.calledOnceWith({ token })).to.be.true;

            findByNameStub.restore();
        });

        it(`deve retornar uma mensagem de sucesso quando passar um usuário válido
        credenciais, mas com função diferente de administrador`, async () => {
            const user = { name: 'regular', role: 'regular' };

            const req = { body: { name: 'regular' } };
            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

            const findByNameStub = sinon.stub(UserServices, 'findByName').resolves(user as UserType);

            await LoginController.login(req as Request, res as any);

            expect(findByNameStub.calledOnceWith('regular')).to.be.true;

            expect(res.status.calledOnceWith(200)).to.be.true;

            expect(res.json.calledOnceWith({ message: 'User regular logged in' })).to.be.true;

            findByNameStub.restore();
        });

        it('deve retornar uma resposta de erro quando ocorrer um erro ao recuperar o usuário', async () => {
            const req = { body: { name: 'unknown' } };
            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            const errorMessage = 'Error retrieving user';

            const findByNameStub = sinon.stub(UserServices, 'findByName').throws(new Error(errorMessage));

            await LoginController.login(req as Request, res as any);

            expect(findByNameStub.calledOnceWith('unknown')).to.be.true;

            expect(res.status.calledOnceWith(500)).to.be.true;

            expect(res.json.calledOnceWith({ message: 500, error: errorMessage })).to.be.true;

            findByNameStub.restore();
        });
    });
});
