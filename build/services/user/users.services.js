"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../database/models/user.model"));
class UserServices {
}
exports.default = UserServices;
_a = UserServices;
UserServices.findByName = async (name) => {
    const findOne = await user_model_1.default.findOne({
        where: { name },
    });
    return findOne;
};
UserServices.addNewUser = async ({ name, password, role }) => {
    const newUser = await user_model_1.default.create({
        name,
        password,
        role,
    });
    return newUser;
};
