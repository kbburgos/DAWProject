import {Router} from "express";
import appController from "../controllers/odontogramaController";

class IndexRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }
  config():void {
    this.router.get("/user/:ced",appController.getByUser);
    this.router.post("/add", appController.addTratamiento);
    this.router.delete("/delete/:id", appController.deleteById);
    this.router.get("/tratamientos", appController.getTratamientos);
    this.router.get("/caras", appController.getCaras);
    this.router.get("/dientes/:ced", appController.getDientesByUser);

  }
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
