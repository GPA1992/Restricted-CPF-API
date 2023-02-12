"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
class CPFController {
}
exports.default = CPFController;
_a = CPFController;
CPFController.addCPF = async (req, res) => {
    try {
        const { cpf } = req.body;
        const cpfCreate = await services_1.CPFService.addCPF(cpf);
        return res.status(200).json(cpfCreate);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
};
