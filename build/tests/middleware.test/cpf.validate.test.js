"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = __importDefault(require("sinon"));
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const cpf_validate_1 = __importDefault(require("../../middleware/cpf.validate"));
chai_1.default.use(chai_http_1.default);
const expect = chai_1.default.expect;
describe.only('CPFValidate', () => {
    describe('CPFBodyFormatValidate', () => {
        it('deve retornar status 400 com uma mensagem de erro se o cpf for invalido', async () => {
            const req = { body: { cpf: '5555555' } };
            const res = { status: sinon_1.default.stub().returnsThis(), json: sinon_1.default.stub() };
            const next = sinon_1.default.stub();
            await cpf_validate_1.default.CPFBodyFormatValidate(req, res, next);
            expect(res.status.calledOnceWith(400)).to.be.true;
            expect(res.json.calledOnceWith({ message: 'InvalidCpfException' })).to.be.true;
            expect(next.notCalled).to.be.true;
        });
        it('deve executar a função next se o CPF for valido', async () => {
            const req = { body: { cpf: '62615214330' } };
            const res = { status: sinon_1.default.stub().returnsThis(), json: sinon_1.default.stub() };
            const next = sinon_1.default.stub();
            await cpf_validate_1.default.CPFBodyFormatValidate(req, res, next);
            expect(res.status.notCalled).to.be.true;
            expect(res.json.notCalled).to.be.true;
            expect(next.calledOnce).to.be.true;
        });
    });
    describe('CPFParamsFormatValidate', () => {
        it('deve retornar status 400 com uma mensagem de erro se o cpf for invalido', async () => {
            const req = { params: { cpf: '5555555' } };
            const res = { status: sinon_1.default.stub().returnsThis(), json: sinon_1.default.stub() };
            const next = sinon_1.default.stub();
            await cpf_validate_1.default.CPFParamsFormatValidate(req, res, next);
            expect(res.status.calledOnceWith(400)).to.be.true;
            expect(res.json.calledOnceWith({ message: 'InvalidCpfException' })).to.be.true;
            expect(next.notCalled).to.be.true;
        });
        it('deve executar a função next se o CPF for valido', async () => {
            const req = { params: { cpf: '216.041.616-98' } };
            const res = { status: sinon_1.default.stub().returnsThis(), json: sinon_1.default.stub() };
            const next = sinon_1.default.stub();
            await cpf_validate_1.default.CPFParamsFormatValidate(req, res, next);
            expect(res.status.notCalled).to.be.true;
            expect(res.json.notCalled).to.be.true;
            expect(next.calledOnce).to.be.true;
        });
    });
    describe('checkIfCPFExist method', () => {
        afterEach(function () {
            sinon_1.default.restore();
        });
        /*         it('deve chamar a função next() se o CPF existir no banco de dados', async () => {
            const req = { params: { cpf: '21604161698' } };
            const res = {
                status: sinon.stub(),
                json: sinon.stub(),
            };
            const next = sinon.stub();

            const findOneCPFStub = sinon.stub(CPFServices, 'findOneCPF').returns();

            await CPFValidate.checkIfCPFExist(req as any, res as any, next);

            expect(findOneCPFStub.calledOnceWith('21604161698')).to.be.true;
            expect(next.calledOnce).to.be.true;

            findOneCPFStub.restore();
        }); */
    });
});
