import {Request, Response } from "express";
import pool from "../database";

class AppController {

  public async newCita(req: Request,res: Response): Promise<void>{
  const {datos, token} = req.params;
  res.json({rows : "respuesta"});
  }

  public async filtrarPorfecha(req: Request,res: Response): Promise<void>{
  const {finicio, ffin, token} = req.params;
  res.json({rows : "respuesta"});
  }

  public async listarCitas(req: Request,res: Response): Promise<void>{
  const {token} = req.params;
  res.json({rows : "respuesta"});
  }

  public async listarHistoricoUsuario(req: Request,res: Response): Promise<void>{
  const {cedula, token} = req.params;
  res.json({rows : "respuesta"});
  }

  public async filtrarDoctorViejas(req: Request,res: Response): Promise<void>{
  const {cedDoctor, token} = req.params;
  res.json({rows : "respuesta"});
  }

  public async citaById(req: Request,res: Response): Promise<void>{
  const {id, token} = req.params;
  res.json({rows : "respuesta"});
  }

  public async citasDelDoctor(req: Request,res: Response): Promise<void>{
  const {cedDoctor, token} = req.params;
  res.json({rows : "respuesta"});
  }

  public async deleteCita(req: Request,res: Response): Promise<void>{
  const {id, token} = req.params;
  res.json({rows : "respuesta"});
  }

  public async updateCita(req: Request,res: Response): Promise<void>{
  const {datos, id, token} = req.params;
  res.json({rows : "respuesta"});
  }



}
//let rows = await pool.query("select * from medic");
//req.params.nombre
//res,status(404).json({aqui el json})
export default new AppController();
