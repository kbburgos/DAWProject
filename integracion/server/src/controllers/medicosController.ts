import {Request, Response } from "express";
// import pool from "../database";
const users = require("./../../models").usersistems;
const roles = require("./../../models").roles;
import util from "./../util"

class MedicosController {

  public async top10(req: Request,res: Response): Promise<void>{
  let token = req.header("Authorization");
  if(token == null){
    res.status(400).json({log:"La informacion enviada no es valida, el token de autenticacion no fue enviado"})
    return;
  }
  let tokenjson = util.validarToken(token);
  if(!tokenjson.valido){
    res.status(401).json({log:"Su token a expirado, vuelva a iniciar sesion"})
    return;
  }
  users.findAll({include: [{model: roles, required: true,
   where : {nombre : "medico"}}], limit: 10, order : [['createdAt', 'DESC']]
  }).then((data:any) => {
    if(data==null){
      res.status(401).json({log: "No hay datos de medicos para mostrat"});
      return;
    }
    res.status(200).json(data);
    return;
  }, (err:any) => {
    console.log(err);
    return;
  })
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
}
//let rows = await pool.query("select * from medic");
//req.params.nombre
//res,status(404).json({aqui el json})
export default new MedicosController();
