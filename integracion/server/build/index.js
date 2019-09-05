"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}
require("./database");
//require("./mail");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const uuid = require("uuid/v4");
//impots de rutas personalizadas
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const appRoutes_1 = __importDefault(require("./routes/appRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const citasRoutes_1 = __importDefault(require("./routes/citasRoutes"));
const pacientesRoutes_1 = __importDefault(require("./routes/pacientesRoutes"));
const medicosRoutes_1 = __importDefault(require("./routes/medicosRoutes"));
const usuariosRoutes_1 = __importDefault(require("./routes/usuariosRoutes"));
const examenesRoutes_1 = __importDefault(require("./routes/examenesRoutes"));
const odontogramaRoutes_1 = __importDefault(require("./routes/odontogramaRoutes"));
const tratamientosRoutes_1 = __importDefault(require("./routes/tratamientosRoutes"));
const mailRouter_1 = __importDefault(require("./routes/mailRouter"));
const estadisticasRoutes_1 = __importDefault(require("./routes/estadisticasRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.router();
    }
    config() {
        this.app.set("port", process.env.PORT || 3000);
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, 'views'));
        //static files
        this.app.use(express_1.default.static(path.join(__dirname, '/public')));
        this.app.use(morgan_1.default("dev"));
        this.app.use(cors_1.default());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        /*this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));*/
        let storage = multer.diskStorage({
            destination: path.join(__dirname, "public/uploads"),
            filename: (req, file, cb) => {
                cb(null, uuid() + path.extname(file.originalname).toLowerCase());
            }
        });
        this.app.use(multer({
            storage: storage,
            limits: { fileSize: 3000000 },
            fileFilter: (req, file, cb) => {
                let fileTypes = /jpg|jpeg|png|gif/;
                let extname = fileTypes.test(path.extname(file.originalname));
                if (extname) {
                    return cb(null, true);
                }
                cb("Error el archivo no es soportado, debe ser una imagen valida.");
            }
        }).single("imagen"));
    }
    router() {
        this.app.use("/", indexRoutes_1.default);
        this.app.use("/app", appRoutes_1.default);
        this.app.use("/api/login", loginRoutes_1.default);
        this.app.use("/api/citas/consultar", citasRoutes_1.default);
        this.app.use("/api/pacientes/consultar", pacientesRoutes_1.default);
        this.app.use("/api/medicos/consultar", medicosRoutes_1.default);
        this.app.use("/api/usuarios/consultar", usuariosRoutes_1.default);
        this.app.use("/api/examenes/consultar", examenesRoutes_1.default);
        this.app.use("/api/odontograma/consultar", odontogramaRoutes_1.default);
        this.app.use("/api/tratamientos/consultar", tratamientosRoutes_1.default);
        this.app.use("/api/correo/consultar", mailRouter_1.default);
        this.app.use("/api/estadistica/consultar", estadisticasRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("server on port: ", this.app.get("port"));
            //db.sequelize.sync();
        });
    }
}
const server = new Server();
server.start();
