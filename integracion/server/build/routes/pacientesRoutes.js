"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pacientesController_1 = __importDefault(require("../controllers/pacientesController"));
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/top10/:token", pacientesController_1.default.top10);
        this.router.get("/filtro/:parametro&:token", pacientesController_1.default.filtroParametro);
        this.router.put("/update/:datos&:token", pacientesController_1.default.update);
        this.router.delete("/delete/:id&:token", pacientesController_1.default.delete);
        this.router.post("/new/:datos&:token", pacientesController_1.default.new);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
