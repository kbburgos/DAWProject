import {Router} from "express";
import appController from "../controllers/citasController";

class IndexRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }
  config():void {
    this.router.post("/newcita", appController.newCita);
    this.router.get("/top10/:active",appController.listarCitas);
    this.router.post("/filtrar",appController.filtrarPorfechaParametro);
    this.router.get("/usuario/:cedula",appController.listarHistoricoUsuario);
    this.router.get("/doctor/:cedDoctor",appController.filtrarDoctorViejas);
    this.router.get("/cita/:id",appController.citaById);
    this.router.get("/historial/:id&:active",appController.citasDelDoctor);
    this.router.delete("/delete/:id",appController.deleteCita);
    this.router.put("/update/:id",appController.updateCita);

  }
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
