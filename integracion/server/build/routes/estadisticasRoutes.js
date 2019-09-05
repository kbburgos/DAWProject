"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estadisticasController_1 = __importDefault(require("../controllers/estadisticasController"));
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/atendidas", estadisticasController_1.default.citasAtendidas);
        this.router.get("/noatendidas", estadisticasController_1.default.citasNoAtendidas); //citasNoAtendidas
        this.router.get("/allmedics", estadisticasController_1.default.getallmedics);
        this.router.get("/admin", estadisticasController_1.default.getadmin);
        this.router.get("/top10", estadisticasController_1.default.top10);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
