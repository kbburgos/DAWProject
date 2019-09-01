import {Request, Response } from "express";
const Op = require("sequelize").Op;
import util from './../util';
const users = require("./../../models").usersistems;

class UsuariosController {

  public async top10(req: Request,res: Response): Promise<void>{
    let token = req.header("Authorization");
    if (token == null) {
      res
        .status(400)
        .json({
          log:
            "La informacion enviada no es valida, el token de autenticacion no fue enviado"
        });
      return;
    }
    let tokenjson = util.validarToken(token);
    if (!tokenjson.valido) {
      res
        .status(401)
        .json({ log: "Su token a expirado, vuelva a iniciar sesion" });
      return;
    }
    users
      .findAll({
       
        limit: 10,
        order: [["createdAt", "DESC"]]
      })
      .then(
        (data: any) => {
          if (data.length===0) {
            res
              .status(401)
              .json({ log: "No hay datos de pacientes para mostrar" });
            return;
          }
          res.status(200).json(data);
          return;
        },
        (err: any) => {
          console.log(err);
          res.status(500).json({ log: "Error del servidor" });
          return;
        }
      );
  }

  public async filtroParametro(req: Request,res: Response): Promise<void>{
    let { parametro } = req.params;
    let token = req.header("Authorization");
    if (parametro == null) {
      res.status(400).json({ log: "Debe ingresar datos validos" });
      return;
    }
    if (token == null) {
      res
        .status(400)
        .json({
          log:
            "La informacion enviada no es valida, el token de autenticacion no fue enviado"
        });
      return;
    }
    let tokenjson = util.validarToken(token);
    if (!tokenjson.valido) {
      res
        .status(401)
        .json({ log: "Su token a expirado, vuelva a iniciar sesion" });
      return;
    }
    
    users
      .findAll({
        
        where: {
          [Op.or]: [
            { cedula: { [Op.like]: "%" + parametro + "%" } },
            { nombreUser: { [Op.like]: "%" + parametro + "%" } },
            { apellidoUser: { [Op.like]: "%" + parametro + "%" } }
          ]
        }
      })
      .then(
        (data: any) => {
          
          if (data.length == 0) {
            res.status(200).json({ log: "No hay datos para mostrar" });
            return;
          }
          res.status(200).json(data);
          return;
        },
        (err: any) => {
          console.log(err);
          res.status(500).json({ log: "Error del servidor" });
          return;
        }
      );
  }

  public async update(req: Request,res: Response): Promise<void>{
    let id = req.params.id;
    let token = req.header("Authorization");
    if(id===undefined||req.body.cedula===undefined||req.body.nombreUser===undefined||req.body.apellidoUser===undefined||req.body.rol===undefined){
      res.status(400).json({log:"Debe ingresar datos validos"})
      return
    }
    if(token===undefined){
      res.status(400).json({log:"La informacion enviada no es valida, el token de autenticacion no fue enviado"})
      return
    } if(!util.validarToken(token).valido){
      res.status(401).json({log:"Su token a expirado, vuelva a iniciar sesion"})
      return
    }
    users.update({
      cedula:req.body.cedula,
      pasword:req.body.password,
      nombreUser:req.body.nombreUser,
      apellidoUser:req.body.apellidoUser,
      email:req.body.email,
      phone:req.body.phone,
      is_active:req.body.is_active,
      rol: req.body.rol,
      updatedAt:new Date()
    },{where:{
      cedula: id
    }
  }).then((rs:any)=>{
      if(rs[0]===1){
        res.status(200).json({log:"El usuario se actualizo"})
      return
      }
      res.status(400).json({log:"El usuario ingresado no existe"})
      return
    },
    (err: any) => {
      console.log(err);
      res.status(500).json({ log: "Error del servidor" });
      return;
    })

  }

  



}

export default new UsuariosController();
