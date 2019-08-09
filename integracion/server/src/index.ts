import express, {Application} from "express";
import morgan from "morgan";
import cors from "cors";
import indexRoutes from "./routes/indexRoutes";
import appRoutes from "./routes/appRoutes";
import loginRouter from "./routes/loginRoutes";
import citasRouter from "./routes/citasRoutes";
import pacientesRouter from "./routes/pacientesRoutes";
import medicosRouter from "./routes/medicosRoutes";
import usuariosRouter from "./routes/usuariosRoutes";
import examenesRouter from "./routes/examenesRoutes";
import odontogramaRouter from "./routes/odontogramaRoutes";
import tratamientosRouter from "./routes/tratamientosRoutes";
const bodyParser =  require("body-parser");
class Server {
  public app:Application;
  constructor() {
    this.app = express();
    this.config();
    this.router();  }

  config():void {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: false}));
  }

  router():void {
    this.app.use("/",indexRoutes);
    this.app.use("/app",appRoutes);
    this.app.use("/api/login",loginRouter);
    this.app.use("/api/citas/consultar",citasRouter);
    this.app.use("/api/pacientes/consultar",pacientesRouter);
    this.app.use("/api/medicos/consultar",medicosRouter);
    this.app.use("/api/usuarios/consultar",usuariosRouter);
    this.app.use("/api/examenes/consultar",examenesRouter);
    this.app.use("/api/odontograma/consultar", odontogramaRouter);
    this.app.use("/api/tratamientos/consultar", tratamientosRouter);
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  }

  start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("server on port: ", this.app.get("port"));
      console.log(Date.parse("09-08mn h2019"))
      //db.sequelize.sync();
    });
  }
}
const server = new Server();
server.start();
