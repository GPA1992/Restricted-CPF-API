import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import CPFValidate from '../../middleware/cpf.validate';
import { CPFServices } from '../../services/index';

chai.use(chaiHttp);
const expect = chai.expect;

describe('CPFValidate', () => {
    describe('CPFBodyFormatValidate', () => {
        it('deve retornar status 400 com uma mensagem de erro se o cpf for invalido', async () => {
            const req = { body: { cpf: '5555555' } };
            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            const next = sinon.stub();

            await CPFValidate.CPFBodyFormatValidate(req as any, res as any, next);

            expect(res.status.calledOnceWith(400)).to.be.true;
            expect(res.json.calledOnceWith({ message: 'InvalidCpfException' })).to.be.true;
            expect(next.notCalled).to.be.true;
        });

        it('deve executar a função next() se o CPF for valido', async () => {
            const req = { body: { cpf: '62615214330' } };
            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            const next = sinon.stub();

            await CPFValidate.CPFBodyFormatValidate(req as any, res as any, next);

            expect(res.status.notCalled).to.be.true;
            expect(res.json.notCalled).to.be.true;
            expect(next.calledOnce).to.be.true;
        });
    });

    describe('CPFParamsFormatValidate', () => {
        it('deve retornar status 400 com uma mensagem de erro se o cpf for invalido', async () => {
            const req = { params: { cpf: '5555555' } };
            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            const next = sinon.stub();

            await CPFValidate.CPFParamsFormatValidate(req as any, res as any, next);

            expect(res.status.calledOnceWith(400)).to.be.true;
            expect(res.json.calledOnceWith({ message: 'InvalidCpfException' })).to.be.true;
            expect(next.notCalled).to.be.true;
        });

        it('deve executar a função next() se o CPF for valido', async () => {
            const req = { params: { cpf: '216.041.616-98' } };
            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
            const next = sinon.stub();

            await CPFValidate.CPFParamsFormatValidate(req as any, res as any, next);

            expect(res.status.notCalled).to.be.true;
            expect(res.json.notCalled).to.be.true;
            expect(next.calledOnce).to.be.true;
        });
    });
    describe('checkIfCPFExist method', () => {
        afterEach(function () {
            sinon.restore();
        });
        it('deve chamar a função next() se o CPF existir no banco de dados', async () => {
            const req = { params: { cpf: '21604161698' } };
            const res = {
                status: sinon.stub(),
                json: sinon.stub(),
            };
            const next = sinon.stub();

            const findOneCPFStub = sinon
                .stub(CPFServices, 'findOneCPF')
                .resolves({ cpf: '22372721313', createdAt: '2023-02-25T20:35:28.000Z' });

            await CPFValidate.checkIfCPFExist(req as any, res as any, next);

            expect(findOneCPFStub.calledOnceWith('21604161698')).to.be.true;
            expect(next.calledOnce).to.be.true;

            findOneCPFStub.restore();
        });

        it('deve retornar um código de status 404 se o CPF não existir no banco de dados', async () => {
            const req = { params: { cpf: '21604161698' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };
            const next = sinon.stub();

            const findOneCPFStub = sinon.stub(CPFServices, 'findOneCPF').returns(null);

            await CPFValidate.checkIfCPFExist(req as any, res as any, next);

            expect(findOneCPFStub.calledOnceWith('21604161698')).to.be.true;
            expect(res.status.calledOnceWith(404)).to.be.true;
            expect(res.json.calledOnceWith({ message: 'NotFoundCpfException' })).to.be.true;
            expect(next.notCalled).to.be.true;

            findOneCPFStub.restore();
        });
    });

    describe('checkIfCPFAlreadyExist', () => {
        afterEach(function () {
            sinon.restore();
        });
        it('deve retornar um código de status 409 se o CPF já existe', async () => {
            const req = { body: { cpf: '21604161698' } };

            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

            const next = sinon.stub();

            const findOneCPFStub = sinon
                .stub(CPFServices, 'findOneCPF')
                .resolves({ cpf: '21604161698', createdAt: '2023-02-25T20:35:28.000Z' });

            await CPFValidate.checkIfCPFAlreadyExist(req as any, res as any, next);

            expect(findOneCPFStub.calledOnceWith('21604161698')).to.be.true;

            expect(res.status.calledOnceWith(409)).to.be.true;

            expect(res.json.calledOnceWith({ message: 'ExistsCpfException' })).to.be.true;

            findOneCPFStub.restore();
        });

        it('deve chamar o próximo middleware se o CPF não existe', async () => {
            const req = { body: { cpf: '21604161698' } };

            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

            const findOneCPFStub = sinon.stub(CPFServices, 'findOneCPF').resolves(null);

            const next = sinon.stub();

            await CPFValidate.checkIfCPFAlreadyExist(req as any, res as any, next);

            expect(findOneCPFStub.calledOnceWith('21604161698')).to.be.true;

            expect(res.status.called).to.be.false;

            expect(res.json.called).to.be.false;

            expect(next.calledOnce).to.be.true;

            findOneCPFStub.restore();
        });
    });
});
