import {Router} from "express";
import appController from "../controllers/mailController";
class MailRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }
  config():void {
    this.router.post("/ingresar",appController.enviarMail);
  }
}
const indexRoutes = new MailRoutes();
export default indexRoutes.router;
