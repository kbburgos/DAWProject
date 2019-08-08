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
// import pool from "../database";
const users = require("./../../models").usersistems;
const roles = require("./../../models").roles;
const util_1 = __importDefault(require("./../util"));
const Op = require('sequelize').Op;
var CryptoJS = require("crypto-js");
class MedicosController {
    top10(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.header("Authorization");
            if (token == null) {
                res.status(400).json({ log: "La informacion enviada no es valida, el token de autenticacion no fue enviado" });
                return;
            }
            let tokenjson = util_1.default.validarToken(token);
            if (!tokenjson.valido) {
                res.status(401).json({ log: "Su token a expirado, vuelva a iniciar sesion" });
                return;
            }
            users.findAll({ attributes: ["cedula", "nombreUser", "apellidoUser", "email", "phone"], include: [{ model: roles, required: true,
                        where: { nombre: "medico" }, attributes: ["codigo", "nombre"] }], limit: 10, order: [['createdAt', 'DESC']]
            }).then((data) => {
                //ci, nomcbre completo, direccion, email, telefono
                if (data.length == 0) {
                    res.status(401).json({ log: "No hay datos de medicos para mostrar" });
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
            const { parametro } = req.params;
            let token = req.header("Authorization");
            if (parametro == null) {
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
            if (tokenjson.rol != "administrador") {
                res.status(401).json({ log: "Su usuario no permite la transacción" });
                return;
            }
            users.findAll({ attributes: ["cedula", "nombreUser", "apellidoUser", "email", "phone"], include: [{ model: roles, required: true,
                        where: { nombre: "medico" }, attributes: ["codigo", "nombre"] }], where: { [Op.or]: [
                        { cedula: { [Op.like]: '%' + parametro + '%' } },
                        { nombreUser: { [Op.like]: '%' + parametro + '%' } },
                        { apellidoUser: { [Op.like]: '%' + parametro + '%' } }
                    ] }
            }).then((data) => {
                if (data == null) {
                    res.status(401).json({ log: "No hay datos de medicos para mostrar" });
                    return;
                }
                if (data.length == 0) {
                    res.status(200).json({ log: "No hay datos para mostrar" });
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
            const { datos, token } = req.params;
            res.json({ rows: "respuesta" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let token = req.header("Authorization");
            if (id == null) {
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
            if (tokenjson.rol != "administrador") {
                res.status(401).json({ log: "Su usuario no permite la transacción" });
                return;
            }
            users.destroy({
                where: {
                    cedula: id
                }
            }).then((data) => {
                if (data === 1) {
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
    new(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { shaJSON } = req.params;
            let token = req.header("Authorization");
            if (shaJSON == null || req.body.cedula === undefined || req.body.password === undefined || req.body.nombreUser === undefined || req.body.apellidoUser === undefined || req.body.rol === undefined) {
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
            if (validador.rol != "administrador") {
                res.status(401).json({ log: "Su usuario no permite la transacción" });
                return;
            }
            let usuario = {
                cedula: req.body.cedula,
                pasword: req.body.password,
                nombreUser: req.body.nombreUser,
                apellidoUser: req.body.apellidoUser,
                email: req.body.email,
                phone: req.body.phone,
                rol: req.body.rol,
                image: null,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            let sha = CryptoJS.SHA256(usuario).toString(CryptoJS.enc.Hex);
            if (sha != shaJSON) {
                res.status(401).json({ log: "Los datos enviados fueron adulterados, intente nuevamente." });
                return;
            }
            users.create(usuario).then((rs) => {
                console.log(rs);
                if (rs.cedula == null) {
                    res.status(200).json({ log: "No se pudo crear el usuario." });
                    return;
                }
                res.status(200).json({ log: "Se creo el usuario correctamente." });
                return;
            }, (err) => {
                console.log(err);
                res.status(500).json({ log: "Error del servidor" });
                return;
            });
        });
    }
}
exports.default = new MedicosController();
