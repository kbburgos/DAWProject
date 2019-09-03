import express, {Application} from "express";
if(process.env.NODE_ENV != "production"){
  require("dotenv").config();
}
//require("./database");
//require("./mail");
import morgan from "morgan";
import cors from "cors";
const bodyParser =  require("body-parser");
const multer = require("multer");
const path = require("path");
const uuid = require("uuid/v4");
//impots de rutas personalizadas
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
import mailRouter from "./routes/mailRouter";

class Server {
  public app:Application;
  constructor() {
    this.app = express();
    this.config();
    this.router();  }

  config():void {
    this.app.set("port", process.env.PORT || 3000);
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname, 'views'));
    //static files
    this.app.use(express.static(path.join(__dirname, '/public')));
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    /*this.app.use(express.json());
    this.app.use(express.urlencoded({extended: false}));*/
    let storage = multer.diskStorage({
      destination: path.join(__dirname, "public/uploads"),
      filename: (req:any, file:any, cb:any) => {
          cb(null,uuid()+path.extname(file.originalname).toLowerCase());

      }
    });
    this.app.use(multer({
      storage:storage,
      limits: {fileSize: 3000000},
      fileFilter: (req:any, file:any, cb:any) => {
        let fileTypes = /jpg|jpeg|png|gif/;
        let  extname = fileTypes.test(path.extname(file.originalname));
        if( extname){
          return cb(null,true);
        }
        cb("Error el archivo no es soportado, debe ser una imagen valida.");
      }
    }).single("imagen"));
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
    this.app.use("/api/correo/consultar",mailRouter);
  }

  start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("server on port: ", this.app.get("port"));
      
      //db.sequelize.sync();
    });
  }
}
const server = new Server();
server.start();
