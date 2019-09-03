import {Request, Response } from "express";
// import pool from "../database";
import util from "./../util"
const db = require('./../../models');
const roles = db.roles;
const users = db.usersistems

class LoginController {

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
              .json({ log: "No hay datos de usuarios para mostrar" });
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

  //no admin
  public async ingresar(req: Request,resp: Response): Promise<void>{
  let cedula = req.body.username;
  let pass = req.body.pass;
    if(cedula===undefined||pass===undefined){
      resp.status(400).json({log:"Debe ingresar datos validos"});
      return
    }
  users.findOne({
    include:[{
      model: roles,
      required: true
    }],
    where: {
      cedula:cedula,
      pasword: pass
    }
  }).then(function(res:any){
    if(res===null){
      resp.status(401).json({log:"Su usuario no existe, verifique sus credenciales"});
      return

    }
    if(res.is_active!=1){
      resp.status(401).json({log:"Su usuario no esta activo"});
      return
    }
    else{
      let token = util.crearToken(res.cedula+","+res.role.nombre);
      resp.status(200).json({Nombre:res.nombreUser,Apellido:res.apellidoUser, Rol:util.cifrar(1,res.role.nombre), Cedula:res.cedula,Token:token})
      return
    }
  },
  (err: any) => {
    console.log(err);
    resp.status(500).json({ log: "Error del servidor" });
    return;});
  }
  //no admin
  public async changePass(req: Request, res: Response): Promise<void> {
    let id = req.params.id;
    let newpass = req.body.newpass

    let token = req.header("Authorization");
    if(id===undefined||newpass===undefined){
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
    pasword:newpass,
    updatedAt:new Date()

  },{where:{
    cedula: id
  }
}).then((rs:any)=>{
    if(rs[0]===1){
      res.status(200).json({log:"El usuario actualizo su Password"})
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
  //si admin
  public async newUser(req: Request, res: Response): Promise<void> {
    let token = req.header("Authorization");
    if(req.body.cedula===undefined||req.body.password===undefined||req.body.nombreUser===undefined||req.body.apellidoUser===undefined||req.body.rol===undefined){
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
    //verificar sha debe coincidir, en el body enviar el sha del json
    users.create({
      cedula:req.body.cedula,
      pasword:req.body.password,
      nombreUser:req.body.nombreUser,
      apellidoUser:req.body.apellidoUser,
      email:req.body.email,
      phone:req.body.phone,
      rol:req.body.rol,
      image:null,
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
  //si admin
  public async deleteUser(req: Request, res: Response): Promise<void> {
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
    if(validador.rol != "administrador"){
      res.status(401).json({log:"Su usuario no permite la transacción"})
      return
    }
      users.destroy({
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
  //no admin
  public async getById(req: Request, res: Response): Promise<void> {
    console.log(req.params)
    let token = req.header("Authorization");
    let id = req.params.id;
    if(id===undefined){
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
    users.findOne({include:[{
      model: roles,
      required: true
    }],where: {
      cedula:id
    }}).then((rs:any)=>{

      if(rs===null){
        res.status(401).json({log:"Usuario no existe, verifique la informacion enviada"});
        return
      } if(rs.is_active!=1){
        res.status(401).json({log:"Su usuario no esta activo"});
        return
      }


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

export default new LoginController();
