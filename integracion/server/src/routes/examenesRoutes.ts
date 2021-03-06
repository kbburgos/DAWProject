import {Router} from "express";
import appController from "../controllers/examenesController";

class IndexRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }
  config():void {
    this.router.get("/:cedula&:nomb&:token",appController.home);
    this.router.get("/top10",appController.top10);
    this.router.get("/filtro/:cedula",appController.filtroParametro);//falta
    this.router.delete("/delete/:id",appController.delete);
    
    this.router.post("/new/:cedula&:nomb&:token",appController.newExam);
    this.router.get("/pacienteId/:id",appController.getById);
    this.router.get("/pacienteCedula/:cedula",appController.getByCedula);
    this.router.get("/getbyid/:id",appController.getById);
    this.router.put("/updateexam/:id",appController.updatebyid)
  }
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
