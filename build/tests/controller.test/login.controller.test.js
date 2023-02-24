"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const sinon_1 = __importDefault(require("sinon"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const controllers_1 = require("../../controllers");
const services_1 = require("../../services");
chai_1.default.use(chai_http_1.default);
const expect = chai_1.default.expect;
describe('LoginController', () => {
    const secret = 'jwt_secret';
    const jwtConfig = {
        expiresIn: '999d',
        algorithm: 'HS256',
    };
    describe('login', () => {
        afterEach(function () {
            sinon_1.default.restore();
        });
        it('deve retornar um token JWT quando passar credenciais de usuário válidas', async () => {
            const user = { name: 'admin', role: 'admin' };
            const token = jsonwebtoken_1.default.sign(Object.assign({}, user), secret, jwtConfig);
            const req = { body: { name: 'admin' } };
            const res = { status: sinon_1.default.stub().returnsThis(), json: sinon_1.default.stub() };
            const findByNameStub = sinon_1.default.stub(services_1.UserServices, 'findByName').resolves(user);
            await controllers_1.LoginController.login(req, res);
            expect(findByNameStub.calledOnceWith('admin')).to.be.true;
            expect(jsonwebtoken_1.default.sign(Object.assign({}, user), secret, jwtConfig)).to.equal(token);
            expect(res.status.calledOnceWith(200)).to.be.true;
            expect(res.json.calledOnceWith({ token })).to.be.true;
            findByNameStub.restore();
        });
        it(`deve retornar uma mensagem de sucesso quando passar um usuário válido
        credenciais, mas com função diferente de administrador`, async () => {
            const user = { name: 'regular', role: 'regular' };
            const req = { body: { name: 'regular' } };
            const res = { status: sinon_1.default.stub().returnsThis(), json: sinon_1.default.stub() };
            const findByNameStub = sinon_1.default.stub(services_1.UserServices, 'findByName').resolves(user);
            await controllers_1.LoginController.login(req, res);
            expect(findByNameStub.calledOnceWith('regular')).to.be.true;
            expect(res.status.calledOnceWith(200)).to.be.true;
            expect(res.json.calledOnceWith({ message: 'User regular logged in' })).to.be.true;
            findByNameStub.restore();
        });
        it('deve retornar uma resposta de erro quando ocorrer um erro ao recuperar o usuário', async () => {
            const req = { body: { name: 'unknown' } };
            const res = { status: sinon_1.default.stub().returnsThis(), json: sinon_1.default.stub() };
            const errorMessage = 'Error retrieving user';
            const findByNameStub = sinon_1.default.stub(services_1.UserServices, 'findByName').throws(new Error(errorMessage));
            await controllers_1.LoginController.login(req, res);
            expect(findByNameStub.calledOnceWith('unknown')).to.be.true;
            expect(res.status.calledOnceWith(500)).to.be.true;
            expect(res.json.calledOnceWith({ message: 500, error: errorMessage })).to.be.true;
            findByNameStub.restore();
        });
    });
});
