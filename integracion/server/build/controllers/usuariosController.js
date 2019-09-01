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
const Op = require("sequelize").Op;
const util_1 = __importDefault(require("./../util"));
const users = require("./../../models").usersistems;
class UsuariosController {
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
            users
                .findAll({
                where: {
                    [Op.or]: [
                        { cedula: { [Op.like]: "%" + parametro + "%" } },
                        { nombreUser: { [Op.like]: "%" + parametro + "%" } },
                        { apellidoUser: { [Op.like]: "%" + parametro + "%" } }
                    ]
                }
            })
                .then((data) => {
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
            let id = req.params.id;
            let token = req.header("Authorization");
            if (id === undefined || req.body.cedula === undefined || req.body.nombreUser === undefined || req.body.apellidoUser === undefined || req.body.rol === undefined) {
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
                cedula: req.body.cedula,
                pasword: req.body.password,
                nombreUser: req.body.nombreUser,
                apellidoUser: req.body.apellidoUser,
                email: req.body.email,
                phone: req.body.phone,
                is_active: req.body.is_active,
                rol: req.body.rol,
                updatedAt: new Date()
            }, { where: {
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
}
exports.default = new UsuariosController();
