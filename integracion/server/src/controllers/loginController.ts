import {Request, Response } from "express";
// import pool from "../database";
import util from "./../util"
const db = require('./../../models');
const roles = db.roles;
const users = db.usersistems

class LoginController {

  public async ingresar(req: Request,resp: Response): Promise<void>{
  let cedula = req.body.username
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
      resp.status(200).json({Nombre:res.nombreUser,Apellido:res.apellidoUser, Rol:res.role.nombre,Token:token})
      return
    }
  }, (err:any)=>{
    console.log(err)
  });
  }

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
    } if(!util.validarToken(token)){
      res.status(401).json({log:"Su token a expirado, vuelva a iniciar sesion"})
      return
    }
    users.update({
    pasword:newpass
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
  })
  }

  public async newUser(req: Request, res: Response): Promise<void> {
    let token = req.header("Authorization");
    if(req.body.cedula===undefined||req.body.password===undefined||req.body.nombreUser===undefined||req.body.apellidoUser===undefined||req.body.rol===undefined){
      res.status(400).json({log:"Debe ingresar datos validos"})
      return
    }
    if(token===undefined){
      res.status(400).json({log:"La informacion enviada no es valida, el token de autenticacion no fue enviado"})
      return
    } if(!util.validarToken(token)){
      res.status(401).json({log:"Su token a expirado, vuelva a iniciar sesion"})
      return
    }
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
      updatedAt:new Date()
    }).then((rs:any)=>{console.log(rs)
      res.status(200).json(rs)
      return
    })
  }

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
    } if(!util.validarToken(token)){
      res.status(401).json({log:"Su token a expirado, vuelva a iniciar sesion"})
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
      },(err:any)=>{
        console.log(err)
      })
    
    
  }

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
    } if(!util.validarToken(token)){
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
      

    }, (err:any)=>{
      console.log(err)
      return
    })
    
    
  }

}

export default new LoginController();
