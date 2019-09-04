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
const Op = require("sequelize").Op;
const util_1 = __importDefault(require("./../util"));
const pacientes = require("./../../models").pacientes;
class PacientesController {
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
            pacientes
                .findAll({
                limit: 10,
                order: [["createdAt", "DESC"]]
            })
                .then((data) => {
                if (data.length === 0) {
                    res
                        .status(401)
                        .json({ log: "No hay datos de pacientes para mostrar" });
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
    getallpacientes(req, res) {
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
            pacientes
                .findAll({ attributes: ["cedula", "nombre", "apellido"] }).then((data) => {
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
    filtroParametro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { parametro } = req.params;
            let token = req.header("Authorization");
            if (parametro == null) {
                res.status(400).json({ log: "Debe ingresar datos validos" });
                return;
            }
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
            pacientes
                .findAll({
                where: {
                    [Op.or]: [
                        { cedula: { [Op.like]: "%" + parametro + "%" } },
                        { nombre: { [Op.like]: "%" + parametro + "%" } },
                        { apellido: { [Op.like]: "%" + parametro + "%" } }
                    ]
                }
            })
                .then((data) => {
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
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let token = req.header("Authorization");
            if (id == null || req.body.cedula === undefined || req.body.nombre === undefined || req.body.apellido === undefined) {
                res.status(400).json({ log: "Debe ingresar datos validos" });
                return;
            }
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
            pacientes.update({
                cedula: req.body.cedula,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                phone: req.body.phone,
                updatedAt: new Date()
            }, {
                where: {
                    cedula: id
                }
            }).then((rs) => {
                if (rs[0] === 1) {
                    res.status(200).json({ log: "El usuario se actualizo" });
                    return;
                }
                res.status(400).json({ log: "El usuario ingresado no existe" });
                return;
            }, (err) => {
                console.log(err);
                res.status(500).json({ log: "Error del servidor" });
                return;
            });
        });
    }
    delete(req, res) {
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
            pacientes.destroy({
                where: {
                    cedula: id
                }
            }).then((d) => {
                if (d === 1) {
                    res.status(200).json({ log: "El usuario se elimino con exito" });
                    return;
                }
                res.status(400).json({ log: "El usuario no se elimino, no existe usuarios registrados con esas credenciales" });
                return;
            }, (err) => {
                console.log(err);
                res.status(500).json({ log: "Error del servidor" });
                return;
            });
        });
    }
    newPacient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.header("Authorization");
            if (req.body.cedula === undefined || req.body.nombre === undefined || req.body.apellido === undefined) {
                res.status(400).json({ log: "Debe ingresar datos validos" });
                return;
            }
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
            pacientes.create({
                cedula: req.body.cedula,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                phone: req.body.phone,
                createdAt: new Date(),
                updatedAt: null
            }).then((rs) => {
                console.log(rs);
                res.status(200).json(rs);
                return;
            }, (err) => {
                console.log(err);
                res.status(500).json({ log: "Error del servidor" });
                return;
            });
        });
    }
}
//let rows = await pool.query("select * from medic");
//req.params.nombre
//res,status(404).json({aqui el json})
exports.default = new PacientesController();
