"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mailController_1 = __importDefault(require("../controllers/mailController"));
class MailRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post("/ingresar", mailController_1.default.enviarMail);
    }
}
const indexRoutes = new MailRoutes();
exports.default = indexRoutes.router;
