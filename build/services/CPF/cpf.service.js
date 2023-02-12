"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const cpf_model_1 = __importDefault(require("../../database/models/cpf.model"));
class CPFService {
}
exports.default = CPFService;
_a = CPFService;
CPFService.addCPF = async (cpf) => {
    try {
        const createCPF = await cpf_model_1.default.create({ cpf: '545555564654654' });
        return createCPF;
    }
    catch (error) {
        return error.message;
    }
};
CPFService.findOneCPF = async (cpf) => {
    try {
        const findCPF = await cpf_model_1.default.findOne({ where: { cpf } });
        return findCPF;
    }
    catch (error) {
        return error.message;
    }
};
CPFService.findAllCPF = async () => {
    try {
        const findCPF = await cpf_model_1.default.findAll();
        return findCPF;
    }
    catch (error) {
        return error.message;
    }
};
CPFService.deleteCPF = async (cpf) => {
    try {
        const findCPF = await cpf_model_1.default.destroy({ where: { cpf } });
        return findCPF;
    }
    catch (error) {
        return error.message;
    }
};
