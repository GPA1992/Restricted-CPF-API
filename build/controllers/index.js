"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.LoginController = exports.CPFController = void 0;
const cpf_controller_1 = __importDefault(require("./cpf.controller"));
exports.CPFController = cpf_controller_1.default;
const login_controller_1 = __importDefault(require("./login.controller"));
exports.LoginController = login_controller_1.default;
const user_controller_1 = __importDefault(require("./user.controller"));
exports.UserController = user_controller_1.default;
