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
const Op = require("sequelize").Op;
const citas = require("./../../models").citas;
const medicos = require("./../../models").usersistems;
const pacientes = require("./../../models").pacientes;
class CitasController {
    newCita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.header("Authorization");
            if (req.body.cedula === undefined || req.body.titulo === undefined || req.body.id_paciente === undefined || req.body.id_medico === undefined) {
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
            citas.create({
                titulo: req.body.titulo,
                id_paciente: req.body.id_paciente,
                id_medico: req.body.id_medico,
                createdAt: new Date()
            }).then((data) => {
                if (data.titulo == null) {
                    res.status(401).json({ log: "No se insertaron los datos" });
                    return;
                }
                res.status(200).json({ log: "se insertaron con exito los datos." });
                return;
            }, (err) => {
                console.log(err);
                res.status(500).json({ log: "Error del servidor" });
                return;
            });
        });
    }
    filtrarPorfecha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { finicio, ffin } = req.params;
            if (finicio === undefined || ffin === undefined) {
                res.status(400).json({ log: "Debe ingresar datos validos" });
                return;
            }
            let dateI = Date.parse(finicio);
            let dateF = Date.parse(ffin);
            if (dateI === NaN || dateF === NaN) {
                res.status(400).json({ log: "La fecha ingresada no tiene formato valido" });
                return;
            }
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
            citas.findAll({
                where: {
                    fecha: { [Op.between]: [new Date(dateI), new Date(dateF)]
                    }
                }
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
    listarCitas(req, res) {
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
            citas.findAll({ include: [{
                        model: medicos,
                        required: true
                    }, {
                        model: pacientes,
                        required: true
                    }]
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
    listarHistoricoUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.header("Authorization");
            let id = req.params.cedula;
            if (token == null || id === undefined) {
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
            citas.findAll({
                where: {
                    id_paciente: id
                }
            }).then((resp) => {
                if (resp.length == 0) {
                    res.status(400).json({ log: "No hay datos que coincidan para mostrar" });
                    return;
                }
                res.status(200).json(resp);
                return;
            }, (err) => {
                console.log(err);
                res.status(500).json({ log: "Error del servidor" });
                return;
            });
        });
    }
    filtrarDoctorViejas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.cedDoctor;
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
            citas.findAll({
                where: {
                    is_active: 0,
                    id_medico: id
                }
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
    citaById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.header("Authorization");
            let id = req.params.id;
            if (token == null || id === undefined) {
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
            citas.findOne({
                where: {
                    codigo: id
                }
            }).then(function (data) {
                if (data === null) {
                    res.status(401).json({ log: "La cita no existe, verifique los datos ingresados" });
                    return;
                }
                else {
                    res.status(200).json(data);
                    return;
                }
            }, (err) => {
                console.log(err);
                res.status(500).json({ log: "Error del servidor" });
                return;
            });
        });
    }
    citasDelDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.cedDoctor;
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
            citas.findAll({
                where: {
                    is_active: 1,
                    id_medico: id
                }
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
    deleteCita(req, res) {
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
            citas.destroy({
                where: {
                    codigo: id
                }
            }).then((d) => {
                if (d === 1) {
                    res.status(200).json({ log: "La cita se elimino con exito" });
                    return;
                }
                res.status(400).json({ log: "La cita no se elimino, no existe cita registrados con esas credenciales" });
                return;
            }, (err) => {
                console.log(err);
                res.status(500).json({ log: "Error del servidor" });
                return;
            });
        });
    }
    updateCita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let token = req.header("Authorization");
            if (id === undefined || req.body.nota === undefined) {
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
            let today = new Date();
            citas.update({
                nota: req.body.nota,
                updatedAt: today,
                fecha: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
                hora: today.toTimeString().split(" ")[0] //  time: 13:36:47 GMT-0500 (hora de Ecuador)
            }, { where: {
                    codigo: id
                } }).then((rs) => {
                if (rs[0] === 1) {
                    res.status(200).json({ log: "La cita fue actualizada" });
                    return;
                }
                res.status(400).json({ log: "La cita no existe" });
                return;
            }, (err) => {
                console.log(err);
                res.status(500).json({ log: "Error del servidor" });
                return;
            });
        });
    }
}
exports.default = new CitasController();
