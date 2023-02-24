import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { CPFresponse } from '../../types/types';
import CPFModel from '../../database/models/cpf.model';
import CPFService from '../../services/CPF/cpf.services';

const { expect } = chai;
chai.use(chaiHttp);

describe('CPF Services', () => {
    describe('addCPF', () => {
        afterEach(function () {
            sinon.restore();
        });
        it('deve adicionar um novo CPF ao banco de dados', async () => {
            const cpf = '21604161698';
            const createStub = sinon.stub(CPFModel, 'create').resolves({ cpf: '21604161698' } as CPFModel);

            await CPFService.addCPF(cpf);

            expect(createStub.calledOnceWith({ cpf })).to.be.true;
            createStub.restore();
        });

        it('deve retornar uma mensagem de erro quando houver um erro no banco de dados', async () => {
            const cpf = '21604161698';
            const errorMessage = 'Database error';
            const createStub = sinon.stub(CPFModel, 'create').rejects(new Error(errorMessage));

            const result = await CPFService.addCPF(cpf);

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
            const expectedCPF: CPFresponse = { cpf: '21604161698', createdAt: '2022-02-23T10:10:10.000Z' };
            sinon.stub(CPFModel, 'findOne').resolves(expectedCPF as CPFModel);

            const result = await CPFService.findOneCPF('21604161698');

            expect(result).to.deep.equal(expectedCPF);
        });

        it('deve retornar nulo se o objeto CPF não existir', async () => {
            sinon.stub(CPFModel, 'findOne').resolves(null);

            const result = await CPFService.findOneCPF('00000000000');

            expect(result).to.be.null;
        });

        it('deve retornar uma mensagem de erro se ocorrer um erro ao encontrar o objeto CPF', async () => {
            const expectedError = new Error('Database error');
            sinon.stub(CPFModel, 'findOne').rejects(expectedError);

            const result = await CPFService.findOneCPF('21604161698');

            expect(result).to.equal(expectedError.message);
        });
    });

    describe('findAllCPF', () => {
        afterEach(function () {
            sinon.restore();
        });
        it('deve retornar uma matriz de objetos CPF se eles existirem', async () => {
            const expectedCPFArray: CPFresponse[] = [
                { cpf: '21604161698', createdAt: '2022-02-23T10:10:10.000Z' },
                { cpf: '27857544841', createdAt: '2022-02-24T10:10:10.000Z' },
            ];
            sinon.stub(CPFModel, 'findAll').resolves(expectedCPFArray as CPFModel[]);

            const result = await CPFService.findAllCPF();

            expect(result).to.deep.equal(expectedCPFArray);
        });

        it('deve retornar uma matriz vazia se nenhum objeto CPF existir', async () => {
            sinon.stub(CPFModel, 'findAll').resolves([]);

            const result = await CPFService.findAllCPF();

            expect(result).to.deep.equal([]);
        });

        it('deve retornar uma mensagem de erro se ocorrer um erro ao encontrar os objetos CPF', async () => {
            const expectedError = new Error('Database error');
            sinon.stub(CPFModel, 'findAll').rejects(expectedError);

            const result = await CPFService.findAllCPF();

            expect(result).to.equal(expectedError.message);
        });
    });

    describe('deleteCPF', () => {
        afterEach(() => {
            sinon.restore();
        });
        it('deve excluir um CPF', async () => {
            const cpfToDelete = '12345678900';
            const destroyStub = sinon.stub(CPFModel, 'destroy').resolves(1);

            const result = await CPFService.deleteCPF(cpfToDelete);

            expect(destroyStub.calledOnceWith({ where: { cpf: cpfToDelete } })).to.be.true;
            expect(result).to.be.equal(1);

            destroyStub.restore();
        });

        it('deve retornar 0 quando nenhum CPF é excluído', async () => {
            const cpfToDelete = '12345678900';
            const destroyStub = sinon.stub(CPFModel, 'destroy').resolves(0);

            const result = await CPFService.deleteCPF(cpfToDelete);

            expect(destroyStub.calledOnceWith({ where: { cpf: cpfToDelete } })).to.be.true;
            expect(result).to.be.equal(0);

            destroyStub.restore();
        });

        it('deve lidar com erros ao excluir um CPF', async () => {
            const cpfToDelete = '12345678900';
            const destroyStub = sinon.stub(CPFModel, 'destroy').rejects(new Error('Database error'));

            const result = await CPFService.deleteCPF(cpfToDelete);

            expect(destroyStub.calledOnceWith({ where: { cpf: cpfToDelete } })).to.be.true;
            expect(result).to.be.equal('Database error');

            destroyStub.restore();
        });
    });
});
