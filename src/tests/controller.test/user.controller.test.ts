import { expect } from 'chai';
import sinon from 'sinon';
import bcrypt from 'bcryptjs';
import { Request } from 'express';
import { UserController } from '../../controllers';
import { UserServices } from '../../services';

describe('UserController', () => {
    describe('addNewUser', () => {
        afterEach(() => {
            sinon.restore();
        });

        it('deve criar um novo usuário com sucesso', async () => {
            const req = { body: { name: 'user', role: 'admin', password: 'password' } };
            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const newUser = {
                name: req.body.name,
                role: req.body.role,
                password: hash,
            };

            await UserController.addNewUser(req as Request, res as any);

            const addNewUserStub = sinon.stub(UserServices, 'addNewUser').resolves(newUser);

            expect(res.status.calledOnceWith(201)).to.be.true;
            expect(
                res.json.calledOnceWith({
                    message: `User ${req.body.name} successfully created`,
                })
            ).to.be.true;

            addNewUserStub.restore();
        });

        it('deve retornar uma resposta de erro quando ocorrer um erro ao adicionar um novo usuário', async () => {
            const req = { body: { name: 'ProductOwner', password: 'adm_password', role: 'admin' } };
            const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

            const errorMessage = 'Error retrieving user';
            const addNewUserStub = sinon.stub(UserServices, 'addNewUser').throws(new Error(errorMessage));

            await UserController.addNewUser(req as Request, res as any);

            expect(res.status.calledOnceWith(500)).to.be.true;
            expect(res.json.calledOnceWith({ message: 500, error: errorMessage })).to.be.true;

            addNewUserStub.restore();
        });
    });
});
