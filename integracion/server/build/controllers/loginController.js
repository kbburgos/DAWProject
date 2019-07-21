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
class AppController {
    ingresar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cedula, pass, token } = req.params;
            res.json({ rows: "respuesta" });
        });
    }
    changePass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { actual, nueva, token } = req.params;
            res.json({ rows: "respuesta" });
        });
    }
    newUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cifrado, token } = req.params;
            res.json({ rows: "respuesta" });
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, pass, token } = req.params;
            res.json({ rows: "respuesta" });
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, token } = req.params;
            res.json({ rows: "respuesta" });
        });
    }
}
//let rows = await pool.query("select * from medic");
//req.params.nombre
//res,status(404).json({aqui el json})
exports.default = new AppController();
