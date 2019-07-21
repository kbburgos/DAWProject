import {Request, Response } from "express";
import pool from "../database";

class ExamenController {

  public async top10(req: Request,res: Response): Promise<void>{
  const {token} = req.params;
  res.json({rows : "respuesta"});
  }

  public async filtroParametro(req: Request,res: Response): Promise<void>{
  const {parametro, token} = req.params;
  res.json({rows : "respuesta"});
  }

  public async update(req: Request,res: Response): Promise<void>{
  const {datos, token} = req.params;
  res.json({rows : "respuesta"});
  }

  public async delete(req: Request,res: Response): Promise<void>{
  const {id, token} = req.params;
  res.json({rows : "respuesta"});
  }

  public async new(req: Request,res: Response): Promise<void>{
  const {datos, token} = req.params;
  res.json({rows : "respuesta"});
  }

  public async getById(req: Request,res: Response): Promise<void>{
  const {id, token} = req.params;
  res.json({rows : "respuesta"});
  }

  public async getByCedula(req: Request,res: Response): Promise<void>{
  const {cedula, token} = req.params;
  res.json({rows : "respuesta"});
  }



}
//let rows = await pool.query("select * from medic");
//req.params.nombre
//res,status(404).json({aqui el json})
export default new ExamenController();
