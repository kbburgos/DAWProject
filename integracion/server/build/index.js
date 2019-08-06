"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const appRoutes_1 = __importDefault(require("./routes/appRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const citasRoutes_1 = __importDefault(require("./routes/citasRoutes"));
const pacientesRoutes_1 = __importDefault(require("./routes/pacientesRoutes"));
const medicosRoutes_1 = __importDefault(require("./routes/medicosRoutes"));
const usuariosRoutes_1 = __importDefault(require("./routes/usuariosRoutes"));
const examenesRoutes_1 = __importDefault(require("./routes/examenesRoutes"));
//const db = require('./../models');
const bodyParser = require("body-parser");
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.router();
    }
    config() {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(morgan_1.default("dev"));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
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
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
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
