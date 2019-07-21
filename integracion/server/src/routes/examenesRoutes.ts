import {Router} from "express";
import appController from "../controllers/examenesController";

class IndexRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }
  config():void {
    this.router.get("/top10/:token",appController.top10);
    this.router.get("/filtro/:parametro&:token",appController.filtroParametro);
    this.router.put("/update/:datos&:token",appController.update);
    this.router.delete("/delete/:id&:token",appController.delete);
    this.router.post("/new/:datos&:token",appController.new);
    this.router.get("/pacienteId/:id&:token",appController.getById);
    this.router.get("/pacienteCedula/:cedula&:token",appController.getByCedula);
  }
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
