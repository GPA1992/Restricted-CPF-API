"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = __importDefault(require("sinon"));
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const controllers_1 = require("../../controllers");
const services_1 = require("../../services");
chai_1.default.use(chai_http_1.default);
const expect = chai_1.default.expect;
describe('CPFController', () => {
    describe('addCPFToRestrictedList', () => {
        afterEach(function () {
            sinon_1.default.restore();
        });
        it('deve adicionar um CPF à lista restrita e retornar um código de status 201', async () => {
            const req = { body: { cpf: '21604161698' } };
            const res = { status: sinon_1.default.stub().returnsThis(), json: sinon_1.default.stub() };
            const addCPFStub = sinon_1.default.stub(services_1.CPFServices, 'addCPF');
            await controllers_1.CPFController.addCPFToRestrictedList(req, res);
            expect(addCPFStub.calledOnceWith('21604161698')).to.be.true;
            expect(res.status.calledOnceWith(201)).to.be.true;
            expect(res.json.calledOnceWith()).to.be.true;
            addCPFStub.restore();
        });
        it('deve retornar um código de status 500 e uma mensagem de erro se houver um erro', async () => {
            const cpf = '12345678910';
            const req = { body: { cpf } };
            const res = { status: sinon_1.default.stub().returnsThis(), json: sinon_1.default.stub() };
            const error = new Error('Internal Server Error');
            const addCPFStub = sinon_1.default.stub(services_1.CPFServices, 'addCPF').rejects(error);
            await controllers_1.CPFController.addCPFToRestrictedList(req, res);
            expect(addCPFStub.calledOnceWith(cpf)).to.be.true;
            expect(res.status.calledOnceWith(500)).to.be.true;
            expect(res.json.calledOnceWith(error.message)).to.be.true;
            addCPFStub.restore();
        });
    });
    describe('findOneCPFOnRestrictedList', () => {
        afterEach(function () {
            sinon_1.default.restore();
        });
        it('deve encontrar um CPF na lista restrita', async () => {
            const cpf = '12345678910';
            const req = { params: { cpf } };
            const res = { status: sinon_1.default.stub().returnsThis(), json: sinon_1.default.stub() };
            const cpfResult = { cpf, createdAt: new Date() };
            const findOneCPFStub = sinon_1.default.stub(services_1.CPFServices, 'findOneCPF').resolves(cpfResult);
            await controllers_1.CPFController.findOneCPFOnRestrictedList(req, res);
            expect(findOneCPFStub.calledOnceWith(cpf)).to.be.true;
            expect(res.status.calledOnceWith(200)).to.be.true;
            expect(res.json.calledOnceWith(cpfResult)).to.be.true;
            findOneCPFStub.restore();
        });
        it('deve retornar um status 500 se ocorrer um erro', async () => {
            const cpf = '12345678910';
            const req = { params: { cpf } };
            const res = { status: sinon_1.default.stub().returnsThis(), json: sinon_1.default.stub() };
            const error = new Error('Internal Server Error');
            const findOneCPFStub = sinon_1.default.stub(services_1.CPFServices, 'findOneCPF').rejects(error);
            await controllers_1.CPFController.findOneCPFOnRestrictedList(req, res);
            expect(findOneCPFStub.calledOnceWith(cpf)).to.be.true;
            expect(res.status.calledOnceWith(500)).to.be.true;
            expect(res.json.calledOnceWith(error.message)).to.be.true;
            findOneCPFStub.restore();
        });
    });
    describe('findAllCPFOnRestrictedList', () => {
        afterEach(function () {
            sinon_1.default.restore();
        });
        it('deve encontrar todos os CPFs na lista restrita', async () => {
            const req = {};
            const res = { status: sinon_1.default.stub().returnsThis(), json: sinon_1.default.stub() };
            const cpfResult = [
                { cpf: '12345678910', createdAt: new Date() },
                { cpf: '11122233344', createdAt: new Date() },
            ];
            const findAllCPFStub = sinon_1.default.stub(services_1.CPFServices, 'findAllCPF').resolves(cpfResult);
            await controllers_1.CPFController.findAllCPFOnRestrictedList(req, res);
            expect(findAllCPFStub.calledOnce).to.be.true;
            expect(res.status.calledOnceWith(200)).to.be.true;
            expect(res.json.calledOnceWith(cpfResult)).to.be.true;
            findAllCPFStub.restore();
        });
        it('deve retornar um status 500 se ocorrer um erro', async () => {
            const req = {};
            const res = { status: sinon_1.default.stub().returnsThis(), json: sinon_1.default.stub() };
            const error = new Error('Internal Server Error');
            const findAllCPFStub = sinon_1.default.stub(services_1.CPFServices, 'findAllCPF').rejects(error);
            await controllers_1.CPFController.findAllCPFOnRestrictedList(req, res);
            expect(findAllCPFStub.calledOnce).to.be.true;
            expect(res.status.calledOnceWith(500)).to.be.true;
            expect(res.json.calledOnceWith(error.message)).to.be.true;
            findAllCPFStub.restore();
        });
    });
    describe('deleteCPFOnRestrictedList', () => {
        afterEach(function () {
            sinon_1.default.restore();
        });
        it('deve excluir um CPF da lista restrita', async () => {
            const req = { params: { cpf: '12345678910' } };
            const res = { status: sinon_1.default.stub().returnsThis(), json: sinon_1.default.stub() };
            const deleteCPFStub = sinon_1.default.stub(services_1.CPFServices, 'deleteCPF').resolves();
            await controllers_1.CPFController.deleteCPFOnRestrictedList(req, res);
            expect(deleteCPFStub.calledOnceWith('12345678910')).to.be.true;
            expect(res.status.calledOnceWith(204)).to.be.true;
            expect(res.json.calledOnce).to.be.true;
            deleteCPFStub.restore();
        });
        it('deve retornar um status 500 se ocorrer um erro', async () => {
            const req = { params: { cpf: '12345678910' } };
            const res = { status: sinon_1.default.stub().returnsThis(), json: sinon_1.default.stub() };
            const error = new Error('Internal Server Error');
            const deleteCPFStub = sinon_1.default.stub(services_1.CPFServices, 'deleteCPF').rejects(error);
            await controllers_1.CPFController.deleteCPFOnRestrictedList(req, res);
            expect(deleteCPFStub.calledOnceWith('12345678910')).to.be.true;
            expect(res.status.calledOnceWith(500)).to.be.true;
            expect(res.json.calledOnceWith(error.message)).to.be.true;
            deleteCPFStub.restore();
        });
    });
});
