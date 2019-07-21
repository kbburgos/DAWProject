import {Request, Response } from "express";
import pool from "../database";

class AppController {

  public async ingresar(req: Request,res: Response): Promise<void>{
  const {cedula, pass, token} = req.params;
  res.json({rows : "respuesta"});
  }

  public async changePass(req: Request, res: Response): Promise<void> {
    const {actual, nueva, token} = req.params;
    res.json({rows : "respuesta"});
  }

  public async newUser(req: Request, res: Response): Promise<void> {
    const {cifrado, token} = req.params;
    res.json({rows : "respuesta"});
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    const {user, pass, token} = req.params;
    res.json({rows : "respuesta"});
  }

  public async getById(req: Request, res: Response): Promise<void> {
    const {id, token} = req.params;
    res.json({rows : "respuesta"});
  }

}
//let rows = await pool.query("select * from medic");
//req.params.nombre
//res,status(404).json({aqui el json})
export default new AppController();
