import {Request, Response } from "express";
import util from "./../util"
const tratamientos = require("./../../models").tratamientos;
const tipoT = require("./../../models").tipotratamientos;

class TratamientosController {
    public async addTipoT(req: Request, res: Response): Promise<void>{
        let token = req.header("Authorization");
        if(req.body.nombre == null || req.body.descripcion == null){
            res.status(400).json({log: "Ingrese datos validos."});
            return;
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
        let tratamiento = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            createdAt:new Date(),
            updatedAt:new Date()
        }
        tipoT.create(tratamiento).then((rs:any)=>{
            if(rs.codigo==null){
                res.status(200).json({log: "No se pudo crear el tratamiento."});
                return;
            }
            res.status(200).json({log: "Se creo el tratamiento con exito."});
            return;
        }, (err:any) => {
            console.log(err);
            res.status(500).json({log: "Error del servidor."});
            return;
        })

    }

    public async deleteTipoT(req: Request, res: Response): Promise<void> {
        let token = req.header("Authorization");
        let {id} = req.params;
        if(id == null ){
            res.status(400).json({log: "Ingrese datos validos."});
            return;
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
        tipoT.destroy({where: {codigo: id}}).then((d:any) =>{
            if(d==1){
                res.status(200).json({log:"El tratamiento se elimino con exito."});
                return
            }
            res.status(400).json({log:"El tratamiento no se elimino."});
            return
        },(err: any) => {
            console.log(err);
            res.status(500).json({ log: "Error del servidor" });
            return;
          })
    }

    public async addTratamiento(req: Request, res: Response): Promise<void> {
        let token = req.header("Authorization");
        if(req.body.tipo == null || req.body.descripcion == null || req.body.cedula == null){
            res.status(400).json({log: "Ingrese datos validos."});
            return;
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
        let tratamiento = {
            descripcion: req.body.descripcion,
            tipo: req.body.tipo,
            cedula: req.body.cedula,
            createdAt:new Date(),
            updatedAt:new Date()

        }
        tratamientos.create(tratamiento).then((rs:any) =>{
            if(rs.codigo==null){
                res.status(200).json({log: "No se pudo crear el tratamiento."});
                return;
            }
            res.status(200).json({log: "Se creo el tratamiento con exito."});
            return;
        }, (err:any) => {
            console.log(err);
            res.status(500).json({log: "Error del servidor."});
            return;
        })

    }

    public async deleteTratamiento(req: Request, res: Response): Promise<void> {
        let token = req.header("Authorization");
        let {id} = req.params;
        if(id == null ){
            res.status(400).json({log: "Ingrese datos validos."});
            return;
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
        tratamientos.destroy({where: {codigo: id}}).then((d:any) =>{
            if(d==1){
                res.status(200).json({log:"El tratamiento se elimino con exito."});
                return
            }
            res.status(400).json({log:"El tratamiento no se elimino."});
            return
        },(err: any) => {
            console.log(err);
            res.status(500).json({ log: "Error del servidor" });
            return;
          })
    }

}

export default new TratamientosController();