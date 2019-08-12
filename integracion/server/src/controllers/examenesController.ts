import {Request, Response } from "express";
import util from "./../util";
const fs = require("fs-extra");
const cloudinary = require("cloudinary");
const examen = require("./../../modelMongodb/examen");
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET
  });
class ExamenController {
  public home(req:Request, res:Response):void{
    const { cedula, token } = req.params;
    if(cedula == null || token == null){
      res.send("Datos invalidos");
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
    res.render("save",{cedula: cedula, token: token});
    return;
  }

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
    let data = await examen.find().sort("-fecha").limit(10);
    res.json(data);
  }

  public async filtroParametro(req: Request,res: Response): Promise<void>{
    const {fechaI, fechaF, cedula} = req.body;
    let token = req.header("Authorization");
    if(fechaI==null || fechaF==null || cedula==null){
      res.status(400).json({log:"La informacion enviada no es valida."})
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
    let exa_fech = await examen.find({
      fecha: { $gte: new Date(fechaI), $lte: new Date(fechaF) },
      cedula: cedula
    });
    if(exa_fech.length==0){
      res.status(200).json({log: "No hay datos a mostrar."});
      return
    }
    res.status(200).json(exa_fech);
    return;
  }


  public async delete(req: Request,res: Response): Promise<void>{
    const {id} = req.params;
    let token = req.header("Authorization");
    if(id==null){
      res.status(400).json({log:"La informacion enviada no es valida."})
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
    let exa_del = await examen.findByIdAndDelete(id);
    if(exa_del._id ==null){
      res.status(200).json({log: "No se pudo eliminar el examen."});
      return;
    }
    //implementar algo para casos en los que no se elimine de cloudinary la foto, como volver a insertar el registro en la bd
    await cloudinary.v2.uploader.destroy(exa_del.public_id);
    res.status(200).json({log: "Se elimino el examen."});
    return;
  }

  public async new(req: Request,res: Response): Promise<void>{
    const { cedula, token } = req.params;
    if(cedula == null || token == null){
      res.send("Datos invalidos");
      return;
    }
    if( req.body.descripcion==null){
      res.status(400).json({log:"La informacion enviada no es valida."})
      return;
    }
    let tokenjson = util.validarToken(token);
    if(!tokenjson.valido){
      res.status(401).json({log:"Su token a expirado, vuelva a iniciar sesion"})
      return;
    }
    let result = await cloudinary.v2.uploader.upload(req.file.path);
    let examen_new = new examen({
        nota: req.body.descripcion,
        cedula: cedula,
        imageURL: result.url,
        public_id: result.public_id,
        fecha: new Date()
    });
    let mdc = await examen_new.save();
    await fs.unlink(req.file.path);
    if(mdc._id == null){
      res.send("No se pudo guardar el examen.");
      return;
    }
    res.send("Imagen guardada correctamente.");
  }

  public async getById(req: Request,res: Response): Promise<void>{
    const {id} = req.params;
    let token = req.header("Authorization");
    if(id==null){
      res.status(400).json({log:"La informacion enviada no es valida."})
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
    let exa = await examen.findById(id);
    if(exa.length == 0){
      res.status(200).json({log: "No hay datos a eliminar."});
      return;
    }
    res.status(200).json(exa);
  }

  public async getByCedula(req: Request,res: Response): Promise<void>{
    const {cedula} = req.params;
    let token = req.header("Authorization");
    if(cedula==null){
      res.status(400).json({log:"La informacion enviada no es valida."})
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
    let examenes_p = await examen.find({cedula: cedula}).sort("-fecha");
    if(examenes_p.length == 0){
      res.status(200).json({log: "No hay datos a mostrar"});
      return;
    }
    res.status(200).json(examenes_p)
  }



}
export default new ExamenController();
