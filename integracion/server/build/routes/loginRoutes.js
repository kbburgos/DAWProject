"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = __importDefault(require("../controllers/loginController"));
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/ingresar/:cedula&:pass&:token", loginController_1.default.ingresar);
        this.router.put("/chancePass/:actual&:nueva&:token", loginController_1.default.changePass);
        this.router.post("/newUser/:cifrado&:token", loginController_1.default.newUser);
        this.router.delete("/deleteUser/:user&:pass&:token", loginController_1.default.deleteUser);
        this.router.get("/perfil/:id&:token", loginController_1.default.getById);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
