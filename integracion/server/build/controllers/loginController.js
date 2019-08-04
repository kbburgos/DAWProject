"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('./../../models');
const roles = db.roles;
const users = db.usersistems;
class LoginController {
    ingresar(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cedula, pass } = req.params;
            users.findAll({ include: [{ model: roles,
                        where: { nombre: "administrador" }
                    }] }).then((data) => {
                //console.log(data[0]);
                //console.log(users.getRoles());
                resp.json(data);
            });
            //resp.json("{dato : 'hola mundo'}");
            /*users.findAll({
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
            });*/
        });
    }
    changePass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { actual, nueva, token } = req.params;
            res.json({ rows: "respuesta" });
        });
    }
    newUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cifrado, token } = req.params;
            res.json({ rows: "respuesta" });
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, pass, token } = req.params;
            res.json({ rows: "respuesta" });
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, token } = req.params;
            res.json({ rows: "respuesta" });
        });
    }
}
//let rows = await pool.query("select * from medic");
//req.params.nombre
//res,status(404).json({aqui el json})
exports.default = new LoginController();
