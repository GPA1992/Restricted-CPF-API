"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cpf_controller_1 = __importDefault(require("../controllers/cpf.controller"));
const router = express_1.default.Router();
// R -> READ
/* router.get('/', visitorController.getAll); */
// C -> CREATE
router.post('/', cpf_controller_1.default.addCPF);
/* // R -> READ.. But by ID
router.get('/:visitorID');

// U -> UPDATE
router.put('/:visitorID');

// D -> DELETE
router.put('/:visitorID'); */
exports.default = router;
