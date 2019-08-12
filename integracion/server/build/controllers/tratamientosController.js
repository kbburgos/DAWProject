"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __importDefault(require("./../util"));
const tratamientos = require("./../../models").tratamientos;
const tipoT = require("./../../models").tipotratamientos;
class TratamientosController {
    addTipoT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.header("Authorization");
            if (req.body.nombre == null || req.body.descripcion == null) {
                res.status(400).json({ log: "Ingrese datos validos." });
                return;
            }
            if (token == null) {
                res.status(400).json({ log: "La informacion enviada no es valida, el token de autenticacion no fue enviado" });
                return;
            }
            let tokenjson = util_1.default.validarToken(token);
            if (!tokenjson.valido) {
                res.status(401).json({ log: "Su token a expirado, vuelva a iniciar sesion" });
                return;
            }
            let tratamiento = {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            tipoT.create(tratamiento).then((rs) => {
                if (rs.codigo == null) {
                    res.status(200).json({ log: "No se pudo crear el tratamiento." });
                    return;
                }
                res.status(200).json({ log: "Se creo el tratamiento con exito." });
                return;
            }, (err) => {
                console.log(err);
                res.status(500).json({ log: "Error del servidor." });
                return;
            });
        });
    }
    deleteTipoT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.header("Authorization");
            let { id } = req.params;
            if (id == null) {
                res.status(400).json({ log: "Ingrese datos validos." });
                return;
            }
            if (token == null) {
                res.status(400).json({ log: "La informacion enviada no es valida, el token de autenticacion no fue enviado" });
                return;
            }
            let tokenjson = util_1.default.validarToken(token);
            if (!tokenjson.valido) {
                res.status(401).json({ log: "Su token a expirado, vuelva a iniciar sesion" });
                return;
            }
            tipoT.destroy({ where: { codigo: id } }).then((d) => {
                if (d == 1) {
                    res.status(200).json({ log: "El tratamiento se elimino con exito." });
                    return;
                }
                res.status(400).json({ log: "El tratamiento no se elimino." });
                return;
            }, (err) => {
                console.log(err);
                res.status(500).json({ log: "Error del servidor" });
                return;
            });
        });
    }
    addTratamiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.header("Authorization");
            if (req.body.tipo == null || req.body.descripcion == null || req.body.cedula == null) {
                res.status(400).json({ log: "Ingrese datos validos." });
                return;
            }
            if (token == null) {
                res.status(400).json({ log: "La informacion enviada no es valida, el token de autenticacion no fue enviado" });
                return;
            }
            let tokenjson = util_1.default.validarToken(token);
            if (!tokenjson.valido) {
                res.status(401).json({ log: "Su token a expirado, vuelva a iniciar sesion" });
                return;
            }
            let tratamiento = {
                descripcion: req.body.descripcion,
                tipo: req.body.tipo,
                cedula: req.body.cedula,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            tratamientos.create(tratamiento).then((rs) => {
                if (rs.codigo == null) {
                    res.status(200).json({ log: "No se pudo crear el tratamiento." });
                    return;
                }
                res.status(200).json({ log: "Se creo el tratamiento con exito." });
                return;
            }, (err) => {
                console.log(err);
                res.status(500).json({ log: "Error del servidor." });
                return;
            });
        });
    }
    deleteTratamiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.header("Authorization");
            let { id } = req.params;
            if (id == null) {
                res.status(400).json({ log: "Ingrese datos validos." });
                return;
            }
            if (token == null) {
                res.status(400).json({ log: "La informacion enviada no es valida, el token de autenticacion no fue enviado" });
                return;
            }
            let tokenjson = util_1.default.validarToken(token);
            if (!tokenjson.valido) {
                res.status(401).json({ log: "Su token a expirado, vuelva a iniciar sesion" });
                return;
            }
            tratamientos.destroy({ where: { codigo: id } }).then((d) => {
                if (d == 1) {
                    res.status(200).json({ log: "El tratamiento se elimino con exito." });
                    return;
                }
                res.status(400).json({ log: "El tratamiento no se elimino." });
                return;
            }, (err) => {
                console.log(err);
                res.status(500).json({ log: "Error del servidor" });
                return;
            });
        });
    }
}
exports.default = new TratamientosController();
