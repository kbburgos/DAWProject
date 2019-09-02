import {Router} from "express";
import appController from "../controllers/loginController";

class IndexRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }
  config():void {
    this.router.post("/ingresar", appController.ingresar);
    this.router.put("/chancePass/:id", appController.changePass);
    this.router.post("/newUser",appController.newUser);
    this.router.delete("/deleteUser/:id",appController.deleteUser);
    this.router.get("/top10",appController.top10);
    this.router.get("/perfil/:id",appController.getById);
  }
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
