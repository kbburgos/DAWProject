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
        this.router.post("/new/:datos&:token", citasController_1.default.newCita);
        this.router.get("/:token", citasController_1.default.listarCitas);
        this.router.get("/fecha/:finicio&:ffin&:token", citasController_1.default.filtrarPorfecha);
        this.router.get("/usuario/:cedula&:token", citasController_1.default.listarHistoricoUsuario);
        this.router.get("/doctor/:cedDoctor&:token", citasController_1.default.filtrarDoctorViejas);
        this.router.get("/cita/:id&:token", citasController_1.default.citaById);
        this.router.get("/historial/:cedDoctor&:token", citasController_1.default.citasDelDoctor);
        this.router.delete("/delete/:id&:token", citasController_1.default.deleteCita);
        this.router.put("/update/:datos&:id&:token", citasController_1.default.updateCita);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
