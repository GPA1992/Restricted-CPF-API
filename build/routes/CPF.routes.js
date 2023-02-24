"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const cpf_validate_1 = __importDefault(require("../middleware/cpf.validate"));
const auth_1 = __importDefault(require("../auth/auth"));
const router = express_1.default.Router();
router.get('/:cpf', cpf_validate_1.default.CPFParamsFormatValidate, cpf_validate_1.default.checkIfCPFExist, controllers_1.CPFController.findOneCPFOnRestrictedList);
router.get('/', controllers_1.CPFController.findAllCPFOnRestrictedList);
router.post('/', auth_1.default.tokenHandle, cpf_validate_1.default.CPFBodyFormatValidate, cpf_validate_1.default.checkIfCPFAlreadyExist, controllers_1.CPFController.addCPFToRestrictedList);
router.delete('/:cpf', auth_1.default.tokenHandle, cpf_validate_1.default.CPFParamsFormatValidate, cpf_validate_1.default.checkIfCPFExist, controllers_1.CPFController.deleteCPFOnRestrictedList);
exports.default = router;
