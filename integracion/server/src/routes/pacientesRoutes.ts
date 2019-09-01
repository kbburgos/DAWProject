import {Router} from "express";
import appController from "../controllers/pacientesController";

class IndexRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }
  config():void {
    this.router.get("/top10",appController.top10);
    this.router.get("/filtro/:parametro",appController.filtroParametro);
    this.router.put("/update/:id",appController.update);
    this.router.delete("/delete/:id",appController.delete);
    this.router.post("/newPacient",appController.newPacient);
    this.router.get("/getallpacientes",appController.getallpacientes);
  }
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
