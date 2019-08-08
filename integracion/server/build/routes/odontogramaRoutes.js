"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const odontogramaController_1 = __importDefault(require("../controllers/odontogramaController"));
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/user/:ced", odontogramaController_1.default.getByUser);
        this.router.post("/add", odontogramaController_1.default.addTratamiento);
        this.router.delete("/delete/:id", odontogramaController_1.default.deleteById);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
