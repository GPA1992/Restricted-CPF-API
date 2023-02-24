import { expect } from 'chai';
import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import userModel from '../../database/models/user.model';
import { UserServices } from '../../services/index';

chai.use(chaiHttp);

describe('UserService', () => {
    afterEach(function () {
        sinon.restore();
    });
    describe('findByName', () => {
        it('deve encontrar usuário pelo nome', async () => {
            const user = { name: 'John Doe', password: 'password', role: 'user' };
            const findOneStub = sinon.stub(userModel, 'findOne').resolves(user as userModel);
            const result = await UserServices.findByName(user.name);
            expect(result).to.deep.equal(user);
            sinon.assert.calledOnce(findOneStub);
            findOneStub.restore();
        });

        it('deve retornar nulo se o usuário não for encontrado', async () => {
            const findOneStub = sinon.stub(userModel, 'findOne').resolves(null);
            const result = await UserServices.findByName('Unknown User');
            expect(result).to.be.null;
            sinon.assert.calledOnce(findOneStub);
            findOneStub.restore();
        });
    });

    describe('addNewUser', () => {
        afterEach(function () {
            sinon.restore();
        });
        it('deve adicionar um novo usuário', async () => {
            const user = { name: 'John Doe', password: 'password', role: 'user' };
            const createStub = sinon.stub(userModel, 'create').resolves(user as userModel);
            const result = await UserServices.addNewUser(user);
            expect(result).to.deep.equal(user);
            sinon.assert.calledOnce(createStub);
            createStub.restore();
        });

        it('deve retornar nulo se o usuário não for adicionado', async () => {
            const createStub = sinon.stub(userModel, 'create').resolves(null);
            const result = await UserServices.addNewUser({ name: 'Unknown User', password: 'password', role: 'user' });
            expect(result).to.be.null;
            sinon.assert.calledOnce(createStub);
            createStub.restore();
        });
    });
});
