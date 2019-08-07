import {Request, Response } from "express";
// import pool from "../database";
const users = require("./../../models").usersistems;
const roles = require("./../../models").roles;
import util from "./../util"
const Op = require('sequelize').Op;
var CryptoJS = require("crypto-js");

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
      res.status(401).json({log: "No hay datos de medicos para mostrar"});
      return;
    }
    res.status(200).json(data);
    return;
  }, (err:any) => {
    console.log(err);
    res.status(500).json({log: "Error del servidor"});
    return;
  })
  }

  public async filtroParametro(req: Request,res: Response): Promise<void>{
  const {parametro} = req.params;
  let token = req.header("Authorization");
  if(parametro == null){
    res.status(400).json({log:"Debe ingresar datos validos"});
    return;
  }
  if(token == null){
    res.status(400).json({log:"La informacion enviada no es valida, el token de autenticacion no fue enviado"});
    return;
  }
  let tokenjson = util.validarToken(token);
  if(!tokenjson.valido){
    res.status(401).json({log:"Su token a expirado, vuelva a iniciar sesion"});
    return;
  }
  if(tokenjson.rol !=  "administrador"){
    res.status(401).json({log:"Su usuario no permite la transacción"});
    return;
  }
  users.findAll({include: [{model: roles, required: true,
   where : {nombre : "medico"}}], where : {[Op.or]: [
     {cedula : {[Op.like]: '%'+parametro+'%'}},
     {nombreUser : {[Op.like]: '%'+parametro+'%'}},
     {apellidoUser : {[Op.like]: '%'+parametro+'%'}}
   ]}
 }).then((data:any) => {
   if(data == null){
     res.status(401).json({log: "No hay datos de medicos para mostrar"});
     return;
   }
   if(data.length == 0){
     res.status(200).json({log : "No hay datos para mostrar"});
     return;
   }
   res.status(200).json(data);
   return;
 }, (err:any) => {
   console.log(err);
   res.status(500).json({log: "Error del servidor"});
   return;
 })

  }

  public async update(req: Request,res: Response): Promise<void>{
  const {datos, token} = req.params;
  res.json({rows : "respuesta"});
  }

  public async delete(req: Request,res: Response): Promise<void>{
  const {id} = req.params;
  let token = req.header("Authorization");
  if(id == null){
    res.status(400).json({log:"Debe ingresar datos validos"});
    return;
  }
  if(token == null){
    res.status(400).json({log:"La informacion enviada no es valida, el token de autenticacion no fue enviado"});
    return;
  }
  let tokenjson = util.validarToken(token);
  if(!tokenjson.valido){
    res.status(401).json({log:"Su token a expirado, vuelva a iniciar sesion"});
    return;
  }
  if(tokenjson.rol != "administrador"){
    res.status(401).json({log:"Su usuario no permite la transacción"});
    return;
  }
  users.destroy({
    where:{
      cedula:id
    }
  }).then((data:any)=>{
    if(data===1){
      res.status(200).json({log:"El usuario se elimino con exito"})
      return
    }
    res.status(400).json({log:"El usuario no se elimino, no existe usuarios registrados con esas credenciales"})
    return
  },(err:any)=>{
    console.log(err);
    res.status(500).json({log: "Error del servidor"});
    return;
  })
  }

  public async new(req: Request,res: Response): Promise<void>{
  const {shaJSON} = req.params;
  let token = req.header("Authorization");
  if(shaJSON==null || req.body.cedula===undefined||req.body.password===undefined||req.body.nombreUser===undefined||req.body.apellidoUser===undefined||req.body.rol===undefined){
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
  if(validador.rol != "administrador"){
    res.status(401).json({log:"Su usuario no permite la transacción"})
    return
  }
  let usuario = {
    cedula:req.body.cedula,
    pasword:req.body.password,
    nombreUser:req.body.nombreUser,
    apellidoUser:req.body.apellidoUser,
    email:req.body.email,
    phone:req.body.phone,
    rol:2,
    image:null,
    createdAt:new Date(),
    updatedAt:new Date()
  }
  let sha = CryptoJS.SHA256(usuario).toString(CryptoJS.enc.Hex)
  if(sha != shaJSON){
    res.status(401).json({log: "Los datos enviados fueron adulterados, intente nuevamente."});
    return;
  }
  users.create(usuario).then((rs:any)=>{console.log(rs)
    res.status(200).json(rs)
    return
  }, (err:any)=> {
    console.log(err);
    res.status(500).json({log: "Error del servidor"});
    return;
  })
  }
}
export default new MedicosController();
