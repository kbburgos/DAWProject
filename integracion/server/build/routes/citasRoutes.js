"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const citasController_1 = __importDefault(require("../controllers/citasController"));
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post("/newcita", citasController_1.default.newCita);
        this.router.get("/top10/:active", citasController_1.default.listarCitas);
        this.router.post("/filtrar", citasController_1.default.filtrarPorfechaParametro);
        this.router.get("/usuario/:cedula", citasController_1.default.listarHistoricoUsuario);
        this.router.get("/doctor/:cedDoctor", citasController_1.default.filtrarDoctorViejas);
        this.router.get("/cita/:id", citasController_1.default.citaById);
        this.router.get("/historial/:id&:active", citasController_1.default.citasDelDoctor);
        this.router.delete("/delete/:id", citasController_1.default.deleteCita);
        this.router.put("/update/:id", citasController_1.default.updateCita);
        this.router.put("/atender/:id", citasController_1.default.updateCitaAtender);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
