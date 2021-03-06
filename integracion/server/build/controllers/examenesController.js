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
const fs = require("fs-extra");
const cloudinary = require("cloudinary");
const examen = require("./../../modelMongodb/examen");
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET
});
class ExamenController {
    home(req, res) {
        const { cedula, nomb, token } = req.params;
        if (cedula == null || token == null || nomb == null) {
            res.send("Datos invalidos");
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
        res.render("save", { cedula: cedula, token: token, nomb: nomb });
        return;
    }
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
            try {
                let data = yield examen.find().sort("-fecha").limit(10);
                res.json(data);
            }
            catch (e) {
                console.log(e);
                res.status(500);
            }
        });
    }
    filtroParametro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const {fechaI, fechaF, cedula} = req.body;
            let cedula = req.params.cedula;
            let token = req.header("Authorization");
            // if(fechaI==null || fechaF==null || cedula==null){
            if (cedula == null) {
                res.status(400).json({ log: "La informacion enviada no es valida." });
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
            try {
                let exa_fech = yield examen.find({
                    //fecha: { $gte: new Date(fechaI), $lte: new Date(fechaF) },
                    cedula: cedula
                });
                if (exa_fech.length == 0) {
                    res.status(400).json({ log: "No hay datos a mostrar." });
                    return;
                }
                res.status(200).json(exa_fech);
                return;
            }
            catch (e) {
                console.log(e);
                res.status(500).json({ log: "Error interno del Servidor" });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let token = req.header("Authorization");
            if (id == null) {
                res.status(400).json({ log: "La informacion enviada no es valida." });
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
            try {
                let exa_del = yield examen.findByIdAndDelete(id);
                if (exa_del._id == null) {
                    res.status(200).json({ log: "No se pudo eliminar el examen." });
                    return;
                }
                //implementar algo para casos en los que no se elimine de cloudinary la foto, como volver a insertar el registro en la bd
                yield cloudinary.v2.uploader.destroy(exa_del.public_id);
                res.status(200).json({ log: "Se elimino el examen." });
                return;
            }
            catch (e) {
                console.log(e);
                res.status(500).json({ log: "Error interno del Servidor" });
            }
        });
    }
    newExam(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cedula, token, nomb } = req.params;
            if (cedula == null || token == null || nomb == null) {
                res.send("Datos invalidos");
                return;
            }
            if (req.body.descripcion == null) {
                res.status(400).json({ log: "La informacion enviada no es valida." });
                return;
            }
            let tokenjson = util_1.default.validarToken(token);
            if (!tokenjson.valido) {
                res.status(401).json({ log: "Su token a expirado, vuelva a iniciar sesion" });
                return;
            }
            try {
                let result = yield cloudinary.v2.uploader.upload(req.file.path);
                let examen_new = new examen({
                    nota: req.body.descripcion,
                    cedula: cedula,
                    paciente: nomb,
                    imageURL: result.url,
                    public_id: result.public_id,
                    fecha: new Date()
                });
                let mdc = yield examen_new.save();
                yield fs.unlink(req.file.path);
                if (mdc._id == null) {
                    res.send("No se pudo guardar el examen.");
                    return;
                }
                res.send("Imagen guardada correctamente.");
            }
            catch (e) {
                console.log(e, 'error');
                res.status(500).json({ log: "Error interno del Servidor" });
            }
        });
    }
    updatebyid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            let token = req.header("Authorization");
            if (id == null) {
                res.status(400).json({ log: "La informacion enviada no es valida." });
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
            try {
                let doc = yield examen.update({ "_id": req.params.id }, req.body, { new: true });
                res.status(200).json(doc);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ log: "Error interno del Servidor" });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            let token = req.header("Authorization");
            if (id == null) {
                res.status(400).json({ log: "La informacion enviada no es valida." });
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
            let exa = yield examen.findById(id);
            if (exa.length == 0) {
                res.status(200).json({ log: "No hay datos a eliminar." });
                return;
            }
            res.status(200).json(exa);
        });
    }
    getByCedula(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cedula } = req.params;
            let token = req.header("Authorization");
            if (cedula == null) {
                res.status(400).json({ log: "La informacion enviada no es valida." });
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
            try {
                let examenes_p = yield examen.find({ cedula: cedula }).sort("-fecha");
                if (examenes_p.length == 0) {
                    res.status(200).json({ log: "No hay datos a mostrar" });
                    return;
                }
                res.status(200).json(examenes_p);
            }
            catch (e) {
                console.log(e);
                res.status(500).json({ log: "Error interno del Servidor" });
            }
        });
    }
    getByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            let token = req.header("Authorization");
            if (id == null) {
                res.status(400).json({ log: "La informacion enviada no es valida." });
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
            try {
                let examenes_p = yield examen.findById(id);
                if (examenes_p === null) {
                    res.status(200).json({ log: "No hay datos a mostrar" });
                    return;
                }
                res.status(200).json(examenes_p);
            }
            catch (e) {
                console.log(e);
                res.status(500).json({ log: "Error interno del Servidor" });
            }
        });
    }
}
exports.default = new ExamenController();
