
import { Request, Response } from "express";
import util from './../util';
const Op = require("sequelize").Op;
const citas = require("./../../models").citas;
const medicos = require("./../../models").usersistems;
const pacientes = require("./../../models").pacientes;
const users = require("./../../models").usersistems;
const roles = require("./../../models").roles;
const tratamientos = require("./../../models").tratamientos;
const tipoT = require("./../../models").tipotratamientos;




class EstadisticasController {

    //El objetivo es tener hacer una estadística, en la que se pueda mostrar la cantidad de citas que aún no están atendidas, se den atender aún
    public async citasNoAtendidas(req: Request, res: Response): Promise<void> {
        
        citas.findAll({
          include: [{
            model: medicos,
            required: true,
    
          }, {
            model: pacientes,
            required: true
          }],
          where:{
            is_active:1
          },
          order: [["createdAt", "DESC"]]
        }).then((data: any) => {
          if (data.length == 0) {
            res.status(400).json({ log: "No hay datos que coincidan para mostrar" });
            return;
          }
          res.status(200).json(data);
          return;
        },
          (err: any) => {
            console.log(err);
            res.status(500).json({ log: "Error del servidor" });
            return;
          });
    
      }

      //El objetivo es mostrar en algún gráfico la cantidad de citas que se han atendido hasta el momento
      public async citasAtendidas(req: Request, res: Response): Promise<void> {
        
        citas.findAll({
          include: [{
            model: medicos,
            required: true,
    
          }, {
            model: pacientes,
            required: true
          }],
          where:{
            is_active:0
          },
          
          order: [["createdAt", "DESC"]]
    
    
        }).then((data: any) => {
          if (data.length == 0) {
            res.status(400).json({ log: "No hay datos que coincidan para mostrar" });
            return;
          }
          res.status(200).json(data);
          return;
        },
          (err: any) => {
            console.log(err);
            res.status(500).json({ log: "Error del servidor" });
            return;
          });
    
      }


      //Es para obtener una estadísticas, para ver cuantos médicos están trabajando en el centro y poder llevar una referencia
      //De si existen sufientes médicos para atender a todos.
      public async getallmedics(req: Request,res: Response){
        let token = req.header("Authorization");
        if(token===undefined){
          res.status(400).json({log:"La informacion enviada no es valida, el token de autenticacion no fue enviado"})
          return
        } if(!util.validarToken(token).valido){
          res.status(401).json({log:"Su token a expirado, vuelva a iniciar sesion"})
          return
        }
        users.findAll({attributes:["cedula","nombreUser","apellidoUser"],  include: [{model: roles, required: true,
          where : {nombre : "medico"}, attributes: ["codigo", "nombre"]}]}) .then(
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

      //Es para obtener una estadísticas en conjunto con getallmedics, para mostrar de todos los usuarios existentes una clasificación
      //Entre médicos y administradores
      public async getadmin(req: Request,res: Response){
        let token = req.header("Authorization");
        if(token===undefined){
          res.status(400).json({log:"La informacion enviada no es valida, el token de autenticacion no fue enviado"})
          return
        } if(!util.validarToken(token).valido){
          res.status(401).json({log:"Su token a expirado, vuelva a iniciar sesion"})
          return
        }
        users.findAll({attributes:["cedula","nombreUser","apellidoUser"],  include: [{model: roles, required: true,
          where : {nombre : "administrador"}, attributes: ["codigo", "nombre"]}]}) .then(
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


      
      //Mostrar el top10 de los tratamientos
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
        tipoT
          .findAll({
           
            limit: 10,
            order: [["createdAt", "DESC"]]
          })
          .then(
            (data: any) => {
              if (data.length===0) {
                res
                  .status(401)
                  .json({ log: "No hay datos de tipos de tratamientos para mostrar" });
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



}//



export default new EstadisticasController();

