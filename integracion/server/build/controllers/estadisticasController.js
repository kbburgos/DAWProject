"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __importDefault(require("./../util"));
const Op = require("sequelize").Op;
const citas = require("./../../models").citas;
const medicos = require("./../../models").usersistems;
const pacientes = require("./../../models").pacientes;
const users = require("./../../models").usersistems;
const roles = require("./../../models").roles;
const tratamientos = require("./../../models").tratamientos;
const tipoT = require("./../../models").tipotratamientos;
class EstadisticasController {
    //El objetivo es tener hacer una estadística, en la que se pueda mostrar la cantidad de citas que aún no están atendidas, se den atender aún
    citasNoAtendidas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            citas.findAll({
                include: [{
                        model: medicos,
                        required: true,
                    }, {
                        model: pacientes,
                        required: true
                    }],
                where: {
                    is_active: 1
                },
                order: [["createdAt", "DESC"]]
            }).then((data) => {
                if (data.length == 0) {
                    res.status(400).json({ log: "No hay datos que coincidan para mostrar" });
                    return;
                }
                res.status(200).json(data);
                return;
            }, (err) => {
                console.log(err);
                res.status(500).json({ log: "Error del servidor" });
                return;
            });
        });
    }
    //El objetivo es mostrar en algún gráfico la cantidad de citas que se han atendido hasta el momento
    citasAtendidas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            citas.findAll({
                include: [{
                        model: medicos,
                        required: true,
                    }, {
                        model: pacientes,
                        required: true
                    }],
                where: {
                    is_active: 0
                },
                order: [["createdAt", "DESC"]]
            }).then((data) => {
                if (data.length == 0) {
                    res.status(400).json({ log: "No hay datos que coincidan para mostrar" });
                    return;
                }
                res.status(200).json(data);
                return;
            }, (err) => {
                console.log(err);
                res.status(500).json({ log: "Error del servidor" });
                return;
            });
        });
    }
    //Es para obtener una estadísticas, para ver cuantos médicos están trabajando en el centro y poder llevar una referencia
    //De si existen sufientes médicos para atender a todos.
    getallmedics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.header("Authorization");
            if (token === undefined) {
                res.status(400).json({ log: "La informacion enviada no es valida, el token de autenticacion no fue enviado" });
                return;
            }
            if (!util_1.default.validarToken(token).valido) {
                res.status(401).json({ log: "Su token a expirado, vuelva a iniciar sesion" });
                return;
            }
            users.findAll({ attributes: ["cedula", "nombreUser", "apellidoUser"], include: [{ model: roles, required: true,
                        where: { nombre: "medico" }, attributes: ["codigo", "nombre"] }] }).then((data) => {
                if (data.length == 0) {
                    res.status(400).json({ log: "No hay datos para mostrar" });
                    return;
                }
                res.status(200).json(data);
                return;
            }, (err) => {
                console.log(err);
                res.status(500).json({ log: "Error del servidor" });
                return;
            });
        });
    }
    //Es para obtener una estadísticas en conjunto con getallmedics, para mostrar de todos los usuarios existentes una clasificación
    //Entre médicos y administradores
    getadmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.header("Authorization");
            if (token === undefined) {
                res.status(400).json({ log: "La informacion enviada no es valida, el token de autenticacion no fue enviado" });
                return;
            }
            if (!util_1.default.validarToken(token).valido) {
                res.status(401).json({ log: "Su token a expirado, vuelva a iniciar sesion" });
                return;
            }
            users.findAll({ attributes: ["cedula", "nombreUser", "apellidoUser"], include: [{ model: roles, required: true,
                        where: { nombre: "administrador" }, attributes: ["codigo", "nombre"] }] }).then((data) => {
                if (data.length == 0) {
                    res.status(400).json({ log: "No hay datos para mostrar" });
                    return;
                }
                res.status(200).json(data);
                return;
            }, (err) => {
                console.log(err);
                res.status(500).json({ log: "Error del servidor" });
                return;
            });
        });
    }
    //Mostrar el top10 de los tratamientos
    top10(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.header("Authorization");
            if (token == null) {
                res
                    .status(400)
                    .json({
                    log: "La informacion enviada no es valida, el token de autenticacion no fue enviado"
                });
                return;
            }
            let tokenjson = util_1.default.validarToken(token);
            if (!tokenjson.valido) {
                res
                    .status(401)
                    .json({ log: "Su token a expirado, vuelva a iniciar sesion" });
                return;
            }
            tipoT
                .findAll({
                limit: 10,
                order: [["createdAt", "DESC"]]
            })
                .then((data) => {
                if (data.length === 0) {
                    res
                        .status(401)
                        .json({ log: "No hay datos de tipos de tratamientos para mostrar" });
                    return;
                }
                res.status(200).json(data);
                return;
            }, (err) => {
                console.log(err);
                res.status(500).json({ log: "Error del servidor" });
                return;
            });
        });
    }
} //
exports.default = new EstadisticasController();
