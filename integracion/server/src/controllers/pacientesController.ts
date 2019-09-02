import {Request, Response } from "express";
const Op = require("sequelize").Op;
import util from './../util';
const pacientes = require("./../../models").pacientes;

class PacientesController {

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
    pacientes
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

  public async getallpacientes(req: Request,res: Response){
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
    pacientes
    .findAll({attributes:["cedula","nombre","apellido"]}).then(
      (data: any) => {
        
        if (data.length == 0) {
          res.status(400).json({ log: "No hay datos para mostrar" });
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
    
    pacientes
      .findAll({
        
        where: {
          [Op.or]: [
            { cedula: { [Op.like]: "%" + parametro + "%" } },
            { nombre: { [Op.like]: "%" + parametro + "%" } },
            { apellido: { [Op.like]: "%" + parametro + "%" } }
          ]
        }
      })
      .then(
        (data: any) => {
          
          if (data.length == 0) {
            res.status(400).json({ log: "No hay datos para mostrar" });
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
    let id  = req.params.id;
    let token = req.header("Authorization");
    if (id == null||req.body.cedula===undefined||req.body.nombre===undefined||req.body.apellido===undefined) {
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

    pacientes.update({
      cedula:req.body.cedula,
      nombre:req.body.nombre,
      apellido:req.body.apellido,
      email:req.body.email,
      phone:req.body.phone,
      updatedAt:new Date()
    },{
      where:{
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

  public async delete(req: Request,res: Response): Promise<void>{
    let id = req.params.id;
    let token = req.header("Authorization");
    if(id===undefined){
      res.status(400).json({log:"Debe ingresar datos validos"})
      return
    }
    if(token===undefined){
      res.status(400).json({log:"La informacion enviada no es valida, el token de autenticacion no fue enviado"})
      return
    }
    let validador = util.validarToken(token);
    if(!validador.valido){
      res.status(401).json({log:"Su token a expirado, vuelva a iniciar sesion"})
      return
    }
    pacientes.destroy({
      where:{
        cedula:id
      }
    }).then((d:any)=>{
      if(d===1){
        res.status(200).json({log:"El usuario se elimino con exito"})
        return
      }
      res.status(400).json({log:"El usuario no se elimino, no existe usuarios registrados con esas credenciales"})
      return
    },
    (err: any) => {
      console.log(err);
      res.status(500).json({ log: "Error del servidor" });
      return;
    })
  }

  public async newPacient(req: Request,res: Response): Promise<void>{
    let token = req.header("Authorization");
    if (req.body.cedula===undefined||req.body.nombre===undefined||req.body.apellido===undefined) {
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

    pacientes.create({
      cedula:req.body.cedula,
      
      nombre:req.body.nombre,
      apellido:req.body.apellido,
      email:req.body.email,
      phone:req.body.phone,
      
      createdAt:new Date(),
      updatedAt:null
    }).then((rs:any)=>{console.log(rs)
      res.status(200).json(rs)
      return
    },
    (err: any) => {
      console.log(err);
      res.status(500).json({ log: "Error del servidor" });
      return;
    })
  }



}
//let rows = await pool.query("select * from medic");
//req.params.nombre
//res,status(404).json({aqui el json})
export default new PacientesController();
