"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const controllers_1 = require("../../controllers");
const services_1 = require("../../services");
describe('UserController', () => {
    describe('addNewUser', () => {
        afterEach(() => {
            sinon_1.default.restore();
        });
        it.only('deve criar um novo usuário com sucesso', async () => {
            const req = { body: { name: 'user', role: 'admin', password: 'password' } };
            const res = { status: sinon_1.default.stub().returnsThis(), json: sinon_1.default.stub() };
            const salt = bcryptjs_1.default.genSaltSync(10);
            const hash = bcryptjs_1.default.hashSync(req.body.password, salt);
            const newUser = {
                name: req.body.name,
                role: req.body.role,
                password: hash,
            };
            await controllers_1.UserController.addNewUser(req, res);
            const addNewUserStub = sinon_1.default.stub(services_1.UserServices, 'addNewUser').resolves(newUser);
            (0, chai_1.expect)(addNewUserStub.calledOnceWith(newUser)).to.be.true;
            (0, chai_1.expect)(res.status.calledOnceWith(201)).to.be.true;
            (0, chai_1.expect)(res.json.calledOnceWith({
                message: `User ${req.body.name} successfully created`,
            })).to.be.true;
            addNewUserStub.restore();
        });
        /* it('deve retornar uma resposta de erro quando ocorrer um erro ao adicionar um novo usuário', async () => {
            const req = {
                body: {
                    name: 'user',
                    role: 'regular',
                    password: 'password',
                },
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            const errorMessage = 'Error adding new user';
            const addNewUserStub = sinon.stub(UserServices, 'addNewUser').throws(new Error(errorMessage));

            await UserController.addNewUser(req as Request, res as any);

            expect(addNewUserStub.calledOnceWith(req.body)).to.be.true;
            expect(res.status.calledOnceWith(500)).to.be.true;
            expect(res.json.calledOnceWith({ message: 500, error: errorMessage })).to.be.true;

            addNewUserStub.restore();
        }); */
    });
});
