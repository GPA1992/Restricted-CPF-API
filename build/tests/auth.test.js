"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const sinon_1 = __importDefault(require("sinon"));
const auth_1 = __importDefault(require("../auth/auth"));
chai_1.default.use(chai_http_1.default);
const expect = chai_1.default.expect;
describe('AuthMiddleware', () => {
    const secret = 'jwt_secret';
    const jwtConfig = {
        expiresIn: '999d',
        algorithm: 'HS256',
    };
    describe('tokenHandle', () => {
        afterEach(() => {
            sinon_1.default.restore();
        });
        it('deve retornar um erro 401 quando o token não for enviado', () => {
            const req = { header: sinon_1.default.stub().returns(null) };
            const res = { status: sinon_1.default.stub().returnsThis(), json: sinon_1.default.stub() };
            const next = sinon_1.default.stub();
            auth_1.default.tokenHandle(req, res, next);
            expect(req.header.calledOnceWith('Authorization')).to.be.true;
            expect(res.status.calledOnceWith(401)).to.be.true;
            expect(res.json.calledOnceWith({ message: 'Token not found' })).to.be.true;
            expect(next.notCalled).to.be.true;
        });
        it('deve retornar um erro 401 quando o token não for válido', () => {
            const invalidToken = jwt.sign({ name: 'admin' }, 'invalid_secret', jwtConfig);
            const req = { header: sinon_1.default.stub().returns(invalidToken) };
            const res = { status: sinon_1.default.stub().returnsThis(), json: sinon_1.default.stub() };
            const next = sinon_1.default.stub();
            auth_1.default.tokenHandle(req, res, next);
            expect(req.header.calledOnceWith('Authorization')).to.be.true;
            expect(res.status.calledOnceWith(401)).to.be.true;
            expect(res.json.calledOnceWith({ message: 'Token must be a valid token' })).to.be.true;
            expect(next.notCalled).to.be.true;
        });
        it(`deve adicionar as informações do usuário ao corpo da
     solicitação e chamar o próximo middleware quando o token for válido`, () => {
            const user = { name: 'root', role: 'admin' };
            const token = jwt.sign(Object.assign({}, user), secret, jwtConfig);
            const req = { header: sinon_1.default.stub().returns(token), body: {} };
            const res = { status: sinon_1.default.stub().returnsThis(), json: sinon_1.default.stub() };
            const next = sinon_1.default.stub();
            auth_1.default.tokenHandle(req, res, next);
            const decoded = jwt.verify(req.header('Authorization'), secret);
            const payloadUser = { name: decoded.name, role: decoded.role };
            expect(payloadUser).to.eql(user);
            expect(res.status.notCalled).to.be.true;
            expect(res.json.notCalled).to.be.true;
            expect(next.calledOnce).to.be.true;
        });
    });
});
