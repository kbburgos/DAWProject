import {Request, Response } from "express";
import util from './../util';
const Op = require("sequelize").Op;
const citas = require("./../../models").citas;

class CitasController {

  public async newCita(req: Request,res: Response): Promise<void>{
    let token = req.header("Authorization");
    if (req.body.cedula===undefined||req.body.titulo===undefined||req.body.id_paciente===undefined||req.body.id_medico===undefined) {
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

    citas.create({
      titulo: req.body.titulo,
      id_paciente: req.body.id_paciente,
      id_medico: req.body.id_medico,
      createdAt: new Date()
    }).then((res:any)=>{
      res.status(200).json(res);
        return;
    },
    (err: any) => {
      console.log(err);
      res.status(500).json({ log: "Error del servidor" });
      return;
    })


  }

  public async filtrarPorfecha(req: Request,res: Response): Promise<void>{
  const {finicio, ffin, token} = req.params;
  res.json({rows : "respuesta"});
  }

  public async listarCitas(req: Request,res: Response): Promise<void>{
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
    citas.findAll()
  }

  public async listarHistoricoUsuario(req: Request,res: Response): Promise<void>{
  const {cedula, token} = req.params;
  res.json({rows : "respuesta"});
  }

  public async filtrarDoctorViejas(req: Request,res: Response): Promise<void>{
  const {cedDoctor, token} = req.params;
  res.json({rows : "respuesta"});
  }

  public async citaById(req: Request,res: Response): Promise<void>{
  const {id, token} = req.params;
  res.json({rows : "respuesta"});
  }

  public async citasDelDoctor(req: Request,res: Response): Promise<void>{
  const {cedDoctor, token} = req.params;
  res.json({rows : "respuesta"});
  }

  public async deleteCita(req: Request,res: Response): Promise<void>{
  const {id, token} = req.params;
  res.json({rows : "respuesta"});
  }

  public async updateCita(req: Request,res: Response): Promise<void>{
  const {datos, id, token} = req.params;
  res.json({rows : "respuesta"});
  }



}
//let rows = await pool.query("select * from medic");
//req.params.nombre
//res,status(404).json({aqui el json})
export default new CitasController();
