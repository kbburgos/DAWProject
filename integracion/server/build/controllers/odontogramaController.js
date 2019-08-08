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
const odontograma = require("./../../models").odontograma;
const caras = require("./../../models").caradientes;
const tratamientos = require("./../../models").tratamientoodontogramas;
class OdontogramaController {
    getByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { ced } = req.params;
            let token = req.header("Authorization");
            if (ced == null) {
                res.status(400).json({ log: "Ingrese datos validos para la busqueda" });
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
            odontograma.findAll({ include: [{ model: caras, required: true, attributes: ["nombre", "codigo"] },
                    { model: tratamientos, required: true, attributes: ["codigo", "nombre", "ruta"] }],
                where: { cedula: ced }, attributes: ["codigo", "cara", "tratamiento", "pos"]
            }).then((data) => {
                if (data.length == 0) {
                    res.status(401).json({ log: "No hay datos de odontograma para mostrar" });
                    return;
                }
                res.status(200).json(data);
            }, (err) => {
                console.log(err);
            });
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let token = req.header("Authorization");
            if (id === undefined) {
                res.status(400).json({ log: "Debe ingresar datos validos" });
                return;
            }
            if (token === undefined) {
                res.status(400).json({ log: "La informacion enviada no es valida, el token de autenticacion no fue enviado" });
                return;
            }
            let validador = util_1.default.validarToken(token);
            if (!validador.valido) {
                res.status(401).json({ log: "Su token a expirado, vuelva a iniciar sesion" });
                return;
            }
            odontograma.destroy({ where: { codigo: id } }).then((d) => {
                if (d == 1) {
                    res.status(200).json({ log: true });
                    return;
                }
                res.status(400).json({ log: false });
                return;
            }, (err) => {
                res.status(500).json({ log: "Algo salio mal." });
                console.log(err);
            });
        });
    }
    addTratamiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.header("Authorization");
            if (req.body.cara == null || req.body.tratamiento == null || req.body.pos == null || req.body.cedula == null) {
                res.status(400).json({ log: "Debe ingresar datos validos" });
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
                cara: req.body.cara,
                tratamiento: req.body.tratamiento,
                pos: req.body.cara.pos,
                createdAt: new Date(),
                updatedAt: new Date(),
                cedula: req.body.cedula
            };
            odontograma.create(tratamiento).then((rs) => {
                if (rs.codigo == null) {
                    res.status(200).json({ log: "No se pudo crear el tratamiento" });
                    return;
                }
                res.status(200).json({ log: "Se creo el tratamiento con exito." });
                return;
            }, (err) => {
                console.log(err);
                res.status(500).json({ log: "Algo salio mal." });
            });
        });
    }
}
exports.default = new OdontogramaController();
