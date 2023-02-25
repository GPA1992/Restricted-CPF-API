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
describe('CPFValidate', () => {
    describe('CPFBodyFormatValidate', () => {
        it('should return 400 if cpf is invalid', async () => {
            const req = { body: { cpf: '111.111.111-11' } };
            const res = { status: sinon_1.default.stub().returnsThis(), json: sinon_1.default.stub() };
            const next = sinon_1.default.stub();
            await cpf_validate_1.default.CPFBodyFormatValidate(req, res, next);
            expect(res.status.calledOnceWith(400)).to.be.true;
            expect(res.json.calledOnceWith({ message: 'InvalidCpfException' })).to.be.true;
            expect(next.notCalled).to.be.true;
        });
        it('should call next if cpf is valid', async () => {
            const req = { body: { cpf: '216.041.616-98' } };
            const res = { status: sinon_1.default.stub().returnsThis(), json: sinon_1.default.stub() };
            const next = sinon_1.default.stub();
            await cpf_validate_1.default.CPFBodyFormatValidate(req, res, next);
            expect(res.status.notCalled).to.be.true;
            expect(res.json.notCalled).to.be.true;
            expect(next.calledOnce).to.be.true;
        });
    });
    describe('CPFParamsFormatValidate', () => {
        it('should return 400 if cpf is invalid', async () => {
            const req = { params: { cpf: '111.111.111-11' } };
            const res = { status: sinon_1.default.stub().returnsThis(), json: sinon_1.default.stub() };
            const next = sinon_1.default.stub();
            await cpf_validate_1.default.CPFParamsFormatValidate(req, res, next);
            expect(res.status.calledOnceWith(400)).to.be.true;
            expect(res.json.calledOnceWith({ message: 'InvalidCpfException' })).to.be.true;
            expect(next.notCalled).to.be.true;
        });
        it('should call next if cpf is valid', async () => {
            const req = { params: { cpf: '216.041.616-98' } };
            const res = { status: sinon_1.default.stub().returnsThis(), json: sinon_1.default.stub() };
            const next = sinon_1.default.stub();
            await cpf_validate_1.default.CPFParamsFormatValidate(req, res, next);
            expect(res.status.notCalled).to.be.true;
            expect(res.json.notCalled).to.be.true;
            expect(next.calledOnce).to.be.true;
        });
    });
    /*
    describe('checkIfCPFExist', () => {
        it('should return 404 if cpf does not exist', async () => {
            const req = { params: { cpf: '216.041.616-98' } };
            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            const next = sinon.stub();
            const findOneCPFStub = sinon.stub(CPFServices, 'findOneCPF').returns(null);
        });
    }); */
});
