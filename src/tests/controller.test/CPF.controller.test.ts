import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { CPFController } from '../../controllers';
import { CPFServices } from '../../services';
import { CPFresponse } from '../../types/types';

chai.use(chaiHttp);
const expect = chai.expect;

describe('CPFController', () => {
    describe('addCPFToRestrictedList', () => {
        afterEach(function () {
            sinon.restore();
        });
        it('deve adicionar um CPF à lista restrita e retornar um código de status 201', async () => {
            const req = { body: { cpf: '21604161698' } };

            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

            const addCPFStub = sinon.stub(CPFServices, 'addCPF');

            await CPFController.addCPFToRestrictedList(req as any, res as any);

            expect(addCPFStub.calledOnceWith('21604161698')).to.be.true;

            expect(res.status.calledOnceWith(201)).to.be.true;

            expect(res.json.calledOnceWith()).to.be.true;

            addCPFStub.restore();
        });
        it('deve retornar um código de status 500 e uma mensagem de erro se houver um erro', async () => {
            const cpf = '12345678910';
            const req = { body: { cpf } };
            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            const error = new Error('Internal Server Error');

            const addCPFStub = sinon.stub(CPFServices, 'addCPF').rejects(error);

            await CPFController.addCPFToRestrictedList(req as any, res as any);

            expect(addCPFStub.calledOnceWith(cpf)).to.be.true;
            expect(res.status.calledOnceWith(500)).to.be.true;
            expect(res.json.calledOnceWith(error.message)).to.be.true;

            addCPFStub.restore();
        });
    });
    describe('findOneCPFOnRestrictedList', () => {
        afterEach(function () {
            sinon.restore();
        });
        it('deve encontrar um CPF na lista restrita', async () => {
            const cpf = '12345678910';
            const req = { params: { cpf } };
            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            const cpfResult = { cpf, createdAt: new Date() };
            const findOneCPFStub = sinon.stub(CPFServices, 'findOneCPF').resolves(cpfResult as CPFresponse);

            await CPFController.findOneCPFOnRestrictedList(req as any, res as any);

            expect(findOneCPFStub.calledOnceWith(cpf)).to.be.true;
            expect(res.status.calledOnceWith(200)).to.be.true;
            expect(res.json.calledOnceWith(cpfResult)).to.be.true;

            findOneCPFStub.restore();
        });
        it('deve retornar um status 500 se ocorrer um erro', async () => {
            const cpf = '12345678910';
            const req = { params: { cpf } };
            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            const error = new Error('Internal Server Error');

            const findOneCPFStub = sinon.stub(CPFServices, 'findOneCPF').rejects(error);

            await CPFController.findOneCPFOnRestrictedList(req as any, res as any);

            expect(findOneCPFStub.calledOnceWith(cpf)).to.be.true;
            expect(res.status.calledOnceWith(500)).to.be.true;
            expect(res.json.calledOnceWith(error.message)).to.be.true;

            findOneCPFStub.restore();
        });
    });
    describe('findAllCPFOnRestrictedList', () => {
        afterEach(function () {
            sinon.restore();
        });
        it('deve encontrar todos os CPFs na lista restrita', async () => {
            const req = {};
            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            const cpfResult = [
                { cpf: '12345678910', createdAt: new Date() },
                { cpf: '11122233344', createdAt: new Date() },
            ];
            const findAllCPFStub = sinon.stub(CPFServices, 'findAllCPF').resolves(cpfResult);

            await CPFController.findAllCPFOnRestrictedList(req as any, res as any);

            expect(findAllCPFStub.calledOnce).to.be.true;
            expect(res.status.calledOnceWith(200)).to.be.true;
            expect(res.json.calledOnceWith(cpfResult)).to.be.true;

            findAllCPFStub.restore();
        });

        it('deve retornar um status 500 se ocorrer um erro', async () => {
            const req = {};
            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            const error = new Error('Internal Server Error');

            const findAllCPFStub = sinon.stub(CPFServices, 'findAllCPF').rejects(error);

            await CPFController.findAllCPFOnRestrictedList(req as any, res as any);

            expect(findAllCPFStub.calledOnce).to.be.true;
            expect(res.status.calledOnceWith(500)).to.be.true;
            expect(res.json.calledOnceWith(error.message)).to.be.true;

            findAllCPFStub.restore();
        });
    });
    describe('deleteCPFOnRestrictedList', () => {
        afterEach(function () {
            sinon.restore();
        });
        it('deve excluir um CPF da lista restrita', async () => {
            const req = { params: { cpf: '12345678910' } };
            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            const deleteCPFStub = sinon.stub(CPFServices, 'deleteCPF').resolves();

            await CPFController.deleteCPFOnRestrictedList(req as any, res as any);

            expect(deleteCPFStub.calledOnceWith('12345678910')).to.be.true;
            expect(res.status.calledOnceWith(204)).to.be.true;
            expect(res.json.calledOnce).to.be.true;

            deleteCPFStub.restore();
        });

        it('deve retornar um status 500 se ocorrer um erro', async () => {
            const req = { params: { cpf: '12345678910' } };
            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            const error = new Error('Internal Server Error');

            const deleteCPFStub = sinon.stub(CPFServices, 'deleteCPF').rejects(error);

            await CPFController.deleteCPFOnRestrictedList(req as any, res as any);

            expect(deleteCPFStub.calledOnceWith('12345678910')).to.be.true;
            expect(res.status.calledOnceWith(500)).to.be.true;
            expect(res.json.calledOnceWith(error.message)).to.be.true;

            deleteCPFStub.restore();
        });
    });
});
