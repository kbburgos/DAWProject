"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('./../../models');
const roles = db.roles;
const users = db.usersistems;
class IndexController {
    index(req, res) {
        roles.findAll()
            .then(function (users) {
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
exports.default = new IndexController();
