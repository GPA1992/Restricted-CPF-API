"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcryptjs"));
const services_1 = require("../services");
const incorrectMsg = 'Incorrect name or password';
class UserValidate {
}
_a = UserValidate;
UserValidate.createUserfieldHandle = async (req, res, next) => {
    try {
        const { name, password, role } = req.body;
        const fieldsRequire = name && password && role;
        if (!fieldsRequire) {
            return res.status(400).json({ message: 'All fields must be filled' });
        }
        const findUser = await services_1.UserServices.findByName(name);
        if (findUser !== null) {
            return res.status(409).json({ message: 'UserAlreadyExist' });
        }
        return next();
    }
    catch (err) {
        return res.status(400).json({ message: err.message });
    }
};
UserValidate.loginFieldHandle = async (req, res, next) => {
    try {
        const { name, password } = req.body;
        const fieldsRequire = name && password;
        if (!fieldsRequire) {
            return res.status(400).json({ message: 'All fields must be filled' });
        }
        return next();
    }
    catch (err) {
        return res.status(400).json({ message: err.message });
    }
};
UserValidate.fieldValidate = async (req, res, next) => {
    try {
        const { name, password } = req.body;
        const userData = await services_1.UserServices.findByName(name);
        if (!userData) {
            return res.status(401).json({ message: incorrectMsg });
        }
        const checkPassword = bcrypt.compareSync(password, userData.password);
        if (checkPassword === false) {
            return res.status(401).json({ message: incorrectMsg });
        }
        return next();
    }
    catch (err) {
        return res.status(400).json({ message: err.message });
    }
};
exports.default = UserValidate;
