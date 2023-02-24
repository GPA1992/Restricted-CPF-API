"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const chai_2 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const user_model_1 = __importDefault(require("../../database/models/user.model"));
const index_1 = require("../../services/index");
chai_2.default.use(chai_http_1.default);
describe('UserService', () => {
    afterEach(function () {
        sinon_1.default.restore();
    });
    describe('findByName', () => {
        it('deve encontrar usuário pelo nome', async () => {
            const user = { name: 'John Doe', password: 'password', role: 'user' };
            const findOneStub = sinon_1.default.stub(user_model_1.default, 'findOne').resolves(user);
            const result = await index_1.UserServices.findByName(user.name);
            (0, chai_1.expect)(result).to.deep.equal(user);
            sinon_1.default.assert.calledOnce(findOneStub);
            findOneStub.restore();
        });
        it('deve retornar nulo se o usuário não for encontrado', async () => {
            const findOneStub = sinon_1.default.stub(user_model_1.default, 'findOne').resolves(null);
            const result = await index_1.UserServices.findByName('Unknown User');
            (0, chai_1.expect)(result).to.be.null;
            sinon_1.default.assert.calledOnce(findOneStub);
            findOneStub.restore();
        });
    });
    describe('addNewUser', () => {
        afterEach(function () {
            sinon_1.default.restore();
        });
        it('deve adicionar um novo usuário', async () => {
            const user = { name: 'John Doe', password: 'password', role: 'user' };
            const createStub = sinon_1.default.stub(user_model_1.default, 'create').resolves(user);
            const result = await index_1.UserServices.addNewUser(user);
            (0, chai_1.expect)(result).to.deep.equal(user);
            sinon_1.default.assert.calledOnce(createStub);
            createStub.restore();
        });
        it('deve retornar nulo se o usuário não for adicionado', async () => {
            const createStub = sinon_1.default.stub(user_model_1.default, 'create').resolves(null);
            const result = await index_1.UserServices.addNewUser({ name: 'Unknown User', password: 'password', role: 'user' });
            (0, chai_1.expect)(result).to.be.null;
            sinon_1.default.assert.calledOnce(createStub);
            createStub.restore();
        });
    });
});
