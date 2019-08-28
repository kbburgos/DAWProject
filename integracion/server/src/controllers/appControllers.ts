import {Request, Response } from "express";
import util from "./../util"

class AppController {
  public async index(req: Request,res: Response): Promise<void>{
  let token:String = util.crearToken("0924995426");
  res.send(token);
  }

  public async validar(req: Request, res: Response): Promise<void> {
    let val = util.validarToken(req.params.token);
    console.log(val);
    res.send("hola");
  }
}
//req.params.nombre
//res,status(404).json({aqui el json})
export default new AppController();
