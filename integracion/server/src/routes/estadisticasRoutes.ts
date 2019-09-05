import {Router} from "express";
import appController from "../controllers/estadisticasController";


class IndexRoutes {
    public router: Router = Router();
  
    constructor() {
      this.config();
    }
    config():void {
      this.router.get("/atendidas",appController.citasAtendidas);
      this.router.get("/noatendidas",appController.citasNoAtendidas); //citasNoAtendidas
      this.router.get("/allmedics",appController.getallmedics);
      this.router.get("/admin",appController.getadmin);
      this.router.get("/top10",appController.top10);


      
    }
  }

  const indexRoutes = new IndexRoutes();
  export default indexRoutes.router;