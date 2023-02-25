import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import * as bcrypt from 'bcryptjs';
import { UserServices } from '../../services';
import UserValidate from '../../middleware/user.validate';
import { UserType } from '../../types/types';

chai.use(chaiHttp);
const expect = chai.expect;

describe('UserValidate', () => {
    describe('createUserfieldHandle', () => {
        it('deve retornar status 400 com uma mensagem de erro se algum campo estiver faltando', async () => {
            const req = { body: { name: 'John Doe', role: 'admin' } };
            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            const next = sinon.stub();

            await UserValidate.createUserfieldHandle(req as any, res as any, next);

            expect(res.status.calledOnceWith(400)).to.be.true;
            expect(res.json.calledOnceWith({ message: 'All fields must be filled' })).to.be.true;
            expect(next.notCalled).to.be.true;
        });

        it('deve retornar status 409 com uma mensagem de erro se o usuário já existir', async () => {
            const req = { body: { name: 'John Doe', password: 'password', role: 'admin' } };
            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            const next = sinon.stub();

            const findByNameStub = sinon.stub(UserServices, 'findByName').resolves({ name: 'John Doe' } as UserType);

            await UserValidate.createUserfieldHandle(req as any, res as any, next);

            expect(res.status.calledOnceWith(409)).to.be.true;
            expect(res.json.calledOnceWith({ message: 'UserAlreadyExist' })).to.be.true;
            expect(next.notCalled).to.be.true;

            findByNameStub.restore();
        });

        it(`deve executar a função next() se todos os 
         campos estiverem preenchidos e o usuário não existir`, async () => {
            const req = { body: { name: 'John Doe', password: 'password', role: 'admin' } };
            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            const next = sinon.stub();

            const findByNameStub = sinon.stub(UserServices, 'findByName').resolves(null);

            await UserValidate.createUserfieldHandle(req as any, res as any, next);

            expect(res.status.notCalled).to.be.true;
            expect(res.json.notCalled).to.be.true;
            expect(next.calledOnce).to.be.true;

            findByNameStub.restore();
        });
    });
    describe('loginFieldHandle', () => {
        it('deve retornar status 400 com uma mensagem de erro se name e/ou password não forem fornecidos', async () => {
            const req = { body: {} };
            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            const next = sinon.stub();

            await UserValidate.loginFieldHandle(req as any, res as any, next);

            expect(res.status.calledOnceWith(400)).to.be.true;
            expect(res.json.calledOnceWith({ message: 'All fields must be filled' })).to.be.true;
            expect(next.notCalled).to.be.true;
        });

        it('deve executar a função next() se name e password forem fornecidos', async () => {
            const req = { body: { name: 'john', password: 'password123' } };
            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            const next = sinon.stub();

            await UserValidate.loginFieldHandle(req as any, res as any, next);

            expect(res.status.notCalled).to.be.true;
            expect(res.json.notCalled).to.be.true;
            expect(next.calledOnce).to.be.true;
        });
    });

    describe('fieldValidate', () => {
        it(`deve retornar o status 401 com uma mensagem de
         erro se o nome ou a senha estiverem incorretos`, async () => {
            const req = { body: { name: 'John', password: 'test123' } };
            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            const next = sinon.stub();

            const findByNameStub = sinon.stub(UserServices, 'findByName').resolves(null);

            await UserValidate.fieldValidate(req as any, res as any, next);

            expect(res.status.calledOnceWith(401)).to.be.true;
            expect(res.json.calledOnceWith({ message: 'Incorrect name or password' })).to.be.true;
            expect(next.notCalled).to.be.true;

            findByNameStub.restore();
        });

        it('deve retornar o status 401 com uma mensagem de erro se a senha estiver incorreta', async () => {
            const req = { body: { name: 'John', password: 'test123' } };
            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            const next = sinon.stub();

            const findByNameStub = sinon
                .stub(UserServices, 'findByName')
                .resolves({ name: 'John', password: '11111' } as UserType);

            await UserValidate.fieldValidate(req as any, res as any, next);

            expect(res.status.calledOnceWith(401)).to.be.true;
            expect(res.json.calledOnceWith({ message: 'Incorrect name or password' })).to.be.true;
            expect(next.notCalled).to.be.true;

            findByNameStub.restore();
        });

        it('deve chamar a next() função se o nome e a senha estiverem corretos', async () => {
            const req = { body: { name: 'John', password: 'test123' } };
            const res = { status: sinon.stub(), json: sinon.stub() };
            const next = sinon.stub();

            const salt = bcrypt.genSaltSync(10);

            const hash = bcrypt.hashSync(req.body.password, salt);
            const findByNameStub = sinon
                .stub(UserServices, 'findByName')
                .resolves({ name: 'John', password: hash } as UserType);

            await UserValidate.fieldValidate(req as any, res as any, next);

            expect(findByNameStub.calledOnceWith('John')).to.be.true;
            expect(res.status.notCalled).to.be.true;
            expect(res.json.notCalled).to.be.true;
            expect(next.calledOnce).to.be.true;

            findByNameStub.restore();
        });
    });
});
