import {Router} from "express";
import appController from "../controllers/tratamientosController";

class IndexRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }
  config():void {
    this.router.post("/addTT", appController.addTipoT);
    this.router.post("/addTratamiento", appController.addTratamiento);
    this.router.delete("/deleteTT/:id",appController.deleteTipoT);
    this.router.delete("/deleteTratamiento/:id",appController.deleteTratamiento);
    
  }
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
