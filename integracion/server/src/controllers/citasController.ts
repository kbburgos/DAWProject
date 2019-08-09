import {Request, Response } from "express";
import util from "./../util"
const citas =require("./../../models").citas;

// import pool from "../database";

class CitasController {

  public async newCita(req: Request,res: Response): Promise<void>{
  let token = req.header("Authorization");
  if(req.body.titulo==null ||req.body.nota==null || req.body.id_paciente==null || req.body.id_medico==null || req.body.fecha==null || req.body..hora==null){
    res.status(400).json({log:"Debe ingresar datos validos"})
    return
  }
  if(token == null){
    res.status(400).json({log:"La informacion enviada no es valida, el token de autenticacion no fue enviado"})
    return;
  }
  let tokenjson = util.validarToken(token);
  if(!tokenjson.valido){
    res.status(401).json({log:"Su token a expirado, vuelva a iniciar sesion"})
    return;
  }
  let cita = {
    titulo: req.body.titulo,
    nota: req.body.titulonota
  }

  res.json({rows : "respuesta"});
  }

  public async filtrarPorfecha(req: Request,res: Response): Promise<void>{
  const {finicio, ffin, token} = req.params;
  res.json({rows : "respuesta"});
  }

  public async listarCitas(req: Request,res: Response): Promise<void>{
  const {token} = req.params;
  res.json({rows : "respuesta"});
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
