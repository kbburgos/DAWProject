import {Request, Response } from "express";
// import pool from "../database";
import util from "./../util"
const db = require('./../../models');
const roles = db.roles;
const users = db.usersistems

class LoginController {

  public async ingresar(req: Request,resp: Response): Promise<void>{
  const {cedula,pass} = req.params

  users.findAll({
    where: {
      cedula:cedula,
      pasword: pass
    }
  }).then(function(res:any){
    if(res[0]===undefined){
      resp.status(401).json({log:"Su usuario no existe, verifique sus credenciales"});

    }else if(res[0].is_active!=1){
      resp.status(401).json({log:"Su usuario no esta activo"});
    }
    else{
      let token = util.crearToken(res[0].cedula+","+res[0].rol);
      resp.status(200).json({Nombre:res[0].nombreUser,Apellido:res[0].apellidoUser,Token:token})
    }
  });
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
export default new LoginController();
