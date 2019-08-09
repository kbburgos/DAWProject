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

  }
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
