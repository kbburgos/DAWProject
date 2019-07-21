"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class CitasController {
    newCita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { datos, token } = req.params;
            res.json({ rows: "respuesta" });
        });
    }
    filtrarPorfecha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { finicio, ffin, token } = req.params;
            res.json({ rows: "respuesta" });
        });
    }
    listarCitas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            res.json({ rows: "respuesta" });
        });
    }
    listarHistoricoUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cedula, token } = req.params;
            res.json({ rows: "respuesta" });
        });
    }
    filtrarDoctorViejas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cedDoctor, token } = req.params;
            res.json({ rows: "respuesta" });
        });
    }
    citaById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, token } = req.params;
            res.json({ rows: "respuesta" });
        });
    }
    citasDelDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cedDoctor, token } = req.params;
            res.json({ rows: "respuesta" });
        });
    }
    deleteCita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, token } = req.params;
            res.json({ rows: "respuesta" });
        });
    }
    updateCita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { datos, id, token } = req.params;
            res.json({ rows: "respuesta" });
        });
    }
}
//let rows = await pool.query("select * from medic");
//req.params.nombre
//res,status(404).json({aqui el json})
exports.default = new CitasController();
