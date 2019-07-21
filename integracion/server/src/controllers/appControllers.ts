import {Request, Response } from "express";
import pool from "../database";

class AppController {
  public async index(req: Request,res: Response): Promise<void>{
  let rows = await pool.query("select * from medic");
  res.json(rows);
  }
}
//req.params.nombre
//res,status(404).json({aqui el json})
export default new AppController();
