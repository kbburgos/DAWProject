import {Router} from "express";
import gamesController from "../controllers/appControllers";
class GamesRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }
  config():void {
    this.router.get("/",gamesController.index);
    this.router.get("/:token",gamesController.validar);
  }
}
const gamesRoutes = new GamesRoutes();
export default gamesRoutes.router;
