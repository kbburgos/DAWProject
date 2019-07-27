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
// import pool from "../database";
class UsuariosController {
    top10(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            res.json({ rows: "respuesta" });
        });
    }
    filtroParametro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { parametro, token } = req.params;
            res.json({ rows: "respuesta" });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { datos, token } = req.params;
            res.json({ rows: "respuesta" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, token } = req.params;
            res.json({ rows: "respuesta" });
        });
    }
    new(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { datos, token } = req.params;
            res.json({ rows: "respuesta" });
        });
    }
}
//let rows = await pool.query("select * from medic");
//req.params.nombre
//res,status(404).json({aqui el json})
exports.default = new UsuariosController();
