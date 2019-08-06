import {Router} from "express";
import appController from "../controllers/medicosController";

class IndexRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }
  config():void {
    this.router.get("/top10/",appController.top10);
    this.router.get("/filtro/:parametro&:token",appController.filtroParametro);
    this.router.put("/update/:datos&:token",appController.update);
    this.router.delete("/delete/:id&:token",appController.delete);
    this.router.post("/new/:datos&:token",appController.new);
  }
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
