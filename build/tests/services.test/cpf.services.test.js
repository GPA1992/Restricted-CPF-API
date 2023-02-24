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
const sinon = __importStar(require("sinon"));
const chai = __importStar(require("chai"));
const chaiHttp = require("chai-http");
const cpf_model_1 = __importDefault(require("../../database/models/cpf.model"));
const cpf_services_1 = __importDefault(require("../../services/CPF/cpf.services"));
const { expect } = chai;
chai.use(chaiHttp);
describe('CPF Services', () => {
    describe('addCPF', () => {
        afterEach(function () {
            sinon.restore();
        });
        it('deve adicionar um novo CPF ao banco de dados', async () => {
            const cpf = '21604161698';
            const createStub = sinon.stub(cpf_model_1.default, 'create').resolves({ cpf: '21604161698' });
            await cpf_services_1.default.addCPF(cpf);
            expect(createStub.calledOnceWith({ cpf })).to.be.true;
            createStub.restore();
        });
        it('deve retornar uma mensagem de erro quando houver um erro no banco de dados', async () => {
            const cpf = '21604161698';
            const errorMessage = 'Database error';
            const createStub = sinon.stub(cpf_model_1.default, 'create').rejects(new Error(errorMessage));
            const result = await cpf_services_1.default.addCPF(cpf);
            expect(createStub.calledOnceWith({ cpf })).to.be.true;
            expect(result).to.equal(errorMessage);
            createStub.restore();
        });
    });
    describe('findOneCPF', () => {
        afterEach(function () {
            sinon.restore();
        });
        it('deve retornar o objeto CPF se ele existir', async () => {
            const expectedCPF = { cpf: '21604161698', createdAt: '2022-02-23T10:10:10.000Z' };
            sinon.stub(cpf_model_1.default, 'findOne').resolves(expectedCPF);
            const result = await cpf_services_1.default.findOneCPF('21604161698');
            expect(result).to.deep.equal(expectedCPF);
        });
        it('deve retornar nulo se o objeto CPF não existir', async () => {
            sinon.stub(cpf_model_1.default, 'findOne').resolves(null);
            const result = await cpf_services_1.default.findOneCPF('00000000000');
            expect(result).to.be.null;
        });
        it('deve retornar uma mensagem de erro se ocorrer um erro ao encontrar o objeto CPF', async () => {
            const expectedError = new Error('Database error');
            sinon.stub(cpf_model_1.default, 'findOne').rejects(expectedError);
            const result = await cpf_services_1.default.findOneCPF('21604161698');
            expect(result).to.equal(expectedError.message);
        });
    });
    describe('findAllCPF', () => {
        afterEach(function () {
            sinon.restore();
        });
        it('deve retornar uma matriz de objetos CPF se eles existirem', async () => {
            const expectedCPFArray = [
                { cpf: '21604161698', createdAt: '2022-02-23T10:10:10.000Z' },
                { cpf: '27857544841', createdAt: '2022-02-24T10:10:10.000Z' },
            ];
            sinon.stub(cpf_model_1.default, 'findAll').resolves(expectedCPFArray);
            const result = await cpf_services_1.default.findAllCPF();
            expect(result).to.deep.equal(expectedCPFArray);
        });
        it('deve retornar uma matriz vazia se nenhum objeto CPF existir', async () => {
            sinon.stub(cpf_model_1.default, 'findAll').resolves([]);
            const result = await cpf_services_1.default.findAllCPF();
            expect(result).to.deep.equal([]);
        });
        it('deve retornar uma mensagem de erro se ocorrer um erro ao encontrar os objetos CPF', async () => {
            const expectedError = new Error('Database error');
            sinon.stub(cpf_model_1.default, 'findAll').rejects(expectedError);
            const result = await cpf_services_1.default.findAllCPF();
            expect(result).to.equal(expectedError.message);
        });
    });
    describe('deleteCPF', () => {
        afterEach(() => {
            sinon.restore();
        });
        it('deve excluir um CPF', async () => {
            const cpfToDelete = '12345678900';
            const destroyStub = sinon.stub(cpf_model_1.default, 'destroy').resolves(1);
            const result = await cpf_services_1.default.deleteCPF(cpfToDelete);
            expect(destroyStub.calledOnceWith({ where: { cpf: cpfToDelete } })).to.be.true;
            expect(result).to.be.equal(1);
            destroyStub.restore();
        });
        it('deve retornar 0 quando nenhum CPF é excluído', async () => {
            const cpfToDelete = '12345678900';
            const destroyStub = sinon.stub(cpf_model_1.default, 'destroy').resolves(0);
            const result = await cpf_services_1.default.deleteCPF(cpfToDelete);
            expect(destroyStub.calledOnceWith({ where: { cpf: cpfToDelete } })).to.be.true;
            expect(result).to.be.equal(0);
            destroyStub.restore();
        });
        it('deve lidar com erros ao excluir um CPF', async () => {
            const cpfToDelete = '12345678900';
            const destroyStub = sinon.stub(cpf_model_1.default, 'destroy').rejects(new Error('Database error'));
            const result = await cpf_services_1.default.deleteCPF(cpfToDelete);
            expect(destroyStub.calledOnceWith({ where: { cpf: cpfToDelete } })).to.be.true;
            expect(result).to.be.equal('Database error');
            destroyStub.restore();
        });
    });
});
