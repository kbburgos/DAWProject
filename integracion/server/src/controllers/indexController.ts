import {Request, Response } from "express";
const db = require('./../../models');
const roles = db.roles;
const users = db.usersistems
class IndexController {
  public index(req: Request,res: Response){
    
    roles.findAll()
    .then(function (users:any) {
      res.json(users);
    });

    // users.findAll()
    // .then(function (users:any) {
    //   res.json(users);
    // });

    // users.create({ 
    //   cedula: '088592',
    //   nombreUser: "Juan",
    //   apellidoUser:"Ramos",
    //   email: "rbrivbivbi",
    //   rol:3 //raios inserto este rol cuando el rol 3 no existe x"d 
    // })
    //   .then(function (user:any) {
    //     res.json(user);
    //   });

  }
}
export default  new IndexController();
