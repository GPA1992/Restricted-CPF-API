"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = exports.CPFServices = void 0;
const cpf_services_1 = __importDefault(require("./CPF/cpf.services"));
exports.CPFServices = cpf_services_1.default;
const users_services_1 = __importDefault(require("./user/users.services"));
exports.UserServices = users_services_1.default;
