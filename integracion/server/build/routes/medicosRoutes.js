"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medicosController_1 = __importDefault(require("../controllers/medicosController"));
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/top10/", medicosController_1.default.top10);
        this.router.get("/filtro/:parametro", medicosController_1.default.filtroParametro);
        this.router.put("/update/:datos&:token", medicosController_1.default.update);
        this.router.delete("/delete/:id", medicosController_1.default.delete);
        this.router.post("/new/:shaJSON", medicosController_1.default.newMedic);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
