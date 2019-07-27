import {Router} from "express";
import appController from "../controllers/loginController";

class IndexRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }
  config():void {
    this.router.get("/ingresar/:cedula&:pass", appController.ingresar);
    this.router.put("/chancePass/:actual&:nueva&:token", appController.changePass);
    this.router.post("/newUser/:cifrado&:token",appController.newUser);
    this.router.delete("/deleteUser/:user&:pass&:token",appController.deleteUser);
    this.router.get("/perfil/:id&:token",appController.getById);
  }
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
