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
const util_1 = __importDefault(require("./../util"));
const db = require('./../../models');
const roles = db.roles;
const users = db.usersistems;
class LoginController {
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
            users
                .findAll({
                limit: 10,
                order: [["createdAt", "DESC"]]
            })
                .then((data) => {
                if (data.length === 0) {
                    res
                        .status(401)
                        .json({ log: "No hay datos de usuarios para mostrar" });
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
    //no admin
    ingresar(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            let cedula = req.body.username;
            let pass = req.body.pass;
            if (cedula === undefined || pass === undefined) {
                resp.status(400).json({ log: "Debe ingresar datos validos" });
                return;
            }
            users.findOne({
                include: [{
                        model: roles,
                        required: true
                    }],
                where: {
                    cedula: cedula,
                    pasword: pass
                }
            }).then(function (res) {
                if (res === null) {
                    resp.status(401).json({ log: "Su usuario no existe, verifique sus credenciales" });
                    return;
                }
                if (res.is_active != 1) {
                    resp.status(401).json({ log: "Su usuario no esta activo" });
                    return;
                }
                else {
                    let token = util_1.default.crearToken(res.cedula + "," + res.role.nombre);
                    resp.status(200).json({ Nombre: res.nombreUser, Apellido: res.apellidoUser, Rol: util_1.default.cifrar(1, res.role.nombre), Cedula: res.cedula, Token: token });
                    return;
                }
            }, (err) => {
                console.log(err);
                resp.status(500).json({ log: "Error del servidor" });
                return;
            });
        });
    }
    //no admin
    changePass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let newpass = req.body.newpass;
            let token = req.header("Authorization");
            if (id === undefined || newpass === undefined) {
                res.status(400).json({ log: "Debe ingresar datos validos" });
                return;
            }
            if (token === undefined) {
                res.status(400).json({ log: "La informacion enviada no es valida, el token de autenticacion no fue enviado" });
                return;
            }
            if (!util_1.default.validarToken(token).valido) {
                res.status(401).json({ log: "Su token a expirado, vuelva a iniciar sesion" });
                return;
            }
            users.update({
                pasword: newpass,
                updatedAt: new Date()
            }, { where: {
                    cedula: id
                }
            }).then((rs) => {
                if (rs[0] === 1) {
                    res.status(200).json({ log: "El usuario actualizo su Password" });
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
    //si admin
    newUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.header("Authorization");
            if (req.body.cedula === undefined || req.body.password === undefined || req.body.nombreUser === undefined || req.body.apellidoUser === undefined || req.body.rol === undefined) {
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
            //verificar sha debe coincidir, en el body enviar el sha del json
            users.create({
                cedula: req.body.cedula,
                pasword: req.body.password,
                nombreUser: req.body.nombreUser,
                apellidoUser: req.body.apellidoUser,
                email: req.body.email,
                phone: req.body.phone,
                rol: req.body.rol,
                image: null,
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
    //si admin
    deleteUser(req, res) {
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
            if (validador.rol != "administrador") {
                res.status(401).json({ log: "Su usuario no permite la transacción" });
                return;
            }
            users.destroy({
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
    //no admin
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            let token = req.header("Authorization");
            let id = req.params.id;
            if (id === undefined) {
                res.status(400).json({ log: "Debe ingresar datos validos" });
                return;
            }
            if (token === undefined) {
                res.status(400).json({ log: "La informacion enviada no es valida, el token de autenticacion no fue enviado" });
                return;
            }
            if (!util_1.default.validarToken(token).valido) {
                res.status(401).json({ log: "Su token a expirado, vuelva a iniciar sesion" });
                return;
            }
            users.findOne({ include: [{
                        model: roles,
                        required: true
                    }], where: {
                    cedula: id
                } }).then((rs) => {
                if (rs === null) {
                    res.status(401).json({ log: "Usuario no existe, verifique la informacion enviada" });
                    return;
                }
                if (rs.is_active != 1) {
                    res.status(401).json({ log: "Su usuario no esta activo" });
                    return;
                }
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
exports.default = new LoginController();
