import {Router} from "express";
import appController from "../controllers/citasController";

class IndexRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }
  config():void {
    this.router.post("/new/:datos&:token", appController.newCita);
    this.router.get("/:token",appController.listarCitas);
    this.router.get("/fecha/:finicio&:ffin&:token",appController.filtrarPorfecha);
    this.router.get("/usuario/:cedula&:token",appController.listarHistoricoUsuario);
    this.router.get("/doctor/:cedDoctor&:token",appController.filtrarDoctorViejas);
    this.router.get("/cita/:id&:token",appController.citaById);
    this.router.get("/historial/:cedDoctor&:token",appController.citasDelDoctor);
    this.router.delete("/delete/:id&:token",appController.deleteCita);
    this.router.put("/update/:datos&:id&:token",appController.updateCita);

  }
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
