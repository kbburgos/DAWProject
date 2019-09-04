import { Request, Response } from "express";
import util from './../util';
const Op = require("sequelize").Op;
const citas = require("./../../models").citas;
const medicos = require("./../../models").usersistems;
const pacientes = require("./../../models").pacientes

class CitasController {

  public async newCita(req: Request, res: Response): Promise<void> {
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
    let date = new Date(Date.parse(req.body.fecha))
    citas.create({
      titulo: req.body.titulo,
      id_paciente: req.body.id_paciente,
      id_medico: req.body.id_medico,
      nota: req.body.nota,
      fecha: date.toDateString(),
      hora: date.toTimeString().split(" ")[0],
      createdAt: new Date()
          }).then((data: any) => {
      if (data.titulo == null) {
        res.status(401).json({ log: "No se insertaron los datos" });
        return;
      }
      res.status(200).json({ log: "se insertaron con exito los datos." });
      return;
    },
      (err: any) => {
        console.log(err);
        res.status(500).json({ log: "Error del servidor" });
        return;
      })
  }

  public async filtrarPorfechaParametro(req: Request, res: Response): Promise<void> {
    let { finicio, ffin, paramMed, paramPac, active } = req.body;
   
    
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
    let pasIsReq = paramPac != "";
    let medIsReq = paramMed != "";
 
    if((ffin===undefined&&finicio===undefined)||(ffin===""&&finicio==="")){
      
      
      citas.findAll({
        include: [{
          model: medicos,
          required: medIsReq,
          where: {
            [Op.or]: [
              { cedula: { [Op.like]: "%" + paramMed + "%" } },
              { nombreUser: { [Op.like]: "%" + paramMed + "%" } },
              { apellidoUser: { [Op.like]: "%" + paramMed + "%" } }
            ]
          }
        }, {
          model: pacientes,
          required: pasIsReq,
          where: {
            [Op.or]: [
              { cedula: { [Op.like]: "%" + paramPac + "%" } },
              { nombre: { [Op.like]: "%" + paramPac + "%" } },
              { apellido: { [Op.like]: "%" + paramPac + "%" } }
            ]
          }
  
        }],where:{
          is_active:active
        }
  
      }).then((data: any) => {
  
        if (data.length == 0) {
          res.status(400).json({ log: "No hay datos que coincidan para mostrar" });
          return;
        }
  
        res.status(200).json(data);
        return;
      },
        (err: any) => {
          console.log("error: " + err);
          res.status(500).json({ log: "Error del servidor" });
          return;
        });
        return;
    }
    let dateI = Date.parse(finicio);
    let dateF = Date.parse(ffin);
    if (dateI === NaN || dateF === NaN) {
      res.status(400).json({ log: "La fechas ingresadas no tiene formato valido" });
      return;
    }
    if (dateI > dateF || dateF < dateI) {
      res.status(400).json({ log: "La fechas ingresadas no forman un rango valido" });
      return;
    }
    citas.findAll({
      include: [{
        model: medicos,
        required: medIsReq,
        where: {
          [Op.or]: [
            { cedula: { [Op.like]: "%" + paramMed + "%" } },
            { nombreUser: { [Op.like]: "%" + paramMed + "%" } },
            { apellidoUser: { [Op.like]: "%" + paramMed + "%" } }
          ]
        }
      }, {
        model: pacientes,
        required: pasIsReq,
        where: {
          [Op.or]: [
            { cedula: { [Op.like]: "%" + paramPac + "%" } },
            { nombre: { [Op.like]: "%" + paramPac + "%" } },
            { apellido: { [Op.like]: "%" + paramPac + "%" } }
          ]
        }

      }],
      where: {

        fecha: {
          [Op.between]: [new Date(dateI), new Date(dateF)]
        },
        is_active:active

      }

    }).then((data: any) => {

      if (data.length == 0) {
        res.status(400).json({ log: "No hay datos que coincidan para mostrar" });
        return;
      }

      res.status(200).json(data);
      return;
    },
      (err: any) => {
        console.log("error: " + err);
        res.status(500).json({ log: "Error del servidor" });
        return;
      });
      return;
  }

  public async listarCitas(req: Request, res: Response): Promise<void> {
    let token = req.header("Authorization");
    
    
    let active = Number(req.params.active);
    if (token == null) {
      res
        .status(400)
        .json({
          log: "La informacion enviada no es valida, el token de autenticacion no fue enviado"
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
    citas.findAll({
      include: [{
        model: medicos,
        required: true,

      }, {
        model: pacientes,
        required: true
      }],
      where:{
        is_active:active
      },
      limit: 10,
      
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

  public async listarHistoricoUsuario(req: Request, res: Response): Promise<void> {
    let token = req.header("Authorization");
    let id = req.params.cedula;
    if (token == null || id === undefined) {
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

    citas.findAll({ order: [["fecha", "DESC"]],
      where: {
        id_paciente: id,
        is_active: false
      }
    }).then((resp: any) => {
      if (resp.length == 0) {
        res.status(400).json({ log: "No hay datos que coincidan para mostrar" });
        return;
      }
      res.status(200).json(resp);
      return;
    },
      (err: any) => {
        console.log(err);
        res.status(500).json({ log: "Error del servidor" });
        return;
      });
  }

  public async filtrarDoctorViejas(req: Request, res: Response): Promise<void> {
    let id = req.params.cedDoctor;
    let token = req.header("Authorization");
    if (id === undefined) {
      res.status(400).json({ log: "Debe ingresar datos validos" })
      return
    }
    if (token === undefined) {
      res.status(400).json({ log: "La informacion enviada no es valida, el token de autenticacion no fue enviado" })
      return
    }
    let validador = util.validarToken(token);
    if (!validador.valido) {
      res.status(401).json({ log: "Su token a expirado, vuelva a iniciar sesion" })
      return
    }
    citas.findAll({
      include: [{
        model: medicos,
        required: true,
        where: {
          cedula: id
        }
      }, {
        model: pacientes,
        required: true
      }], limit: 10,
      order: [["createdAt", "DESC"]],
      where: {
        is_active: 0
      }

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

  public async citaById(req: Request, res: Response): Promise<void> {
    let token = req.header("Authorization");
    let id = req.params.id;
    if (token == null || id === undefined) {
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

    citas.findOne({
      where: {
        codigo: id
      }
    }).then(function (data: any) {
      if (data === null) {
        res.status(400).json({ log: "La cita no existe, verifique los datos ingresados" });
        return

      }

      else {

        res.status(200).json(data)
        return
      }
    },
      (err: any) => {
        console.log(err);
        res.status(500).json({ log: "Error del servidor" });
        return;
      });
  }

  public async citasDelDoctor(req: Request, res: Response): Promise<void> {
    let { id, active } = req.params;
    let token = req.header("Authorization");
    if (id === undefined) {
      res.status(400).json({ log: "Debe ingresar datos validos" })
      return
    }
    if (token === undefined) {
      res.status(400).json({ log: "La informacion enviada no es valida, el token de autenticacion no fue enviado" })
      return
    }
    let validador = util.validarToken(token);
    if (!validador.valido) {
      res.status(401).json({ log: "Su token a expirado, vuelva a iniciar sesion" })
      return
    }
    citas.findAll({
      include: [{
        model: medicos,
        required: true,
        where: {
          cedula: id
        }
      }, {
        model: pacientes,
        required: true
      }], limit: 10,
      order: [["createdAt", "DESC"]],
      where: {
        is_active: Number(active)

      }
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

  public async deleteCita(req: Request, res: Response): Promise<void> {
    let id = req.params.id;
    let token = req.header("Authorization");
    if (id === undefined) {
      res.status(400).json({ log: "Debe ingresar datos validos" })
      return
    }
    if (token === undefined) {
      res.status(400).json({ log: "La informacion enviada no es valida, el token de autenticacion no fue enviado" })
      return
    }
    let validador = util.validarToken(token);
    if (!validador.valido) {
      res.status(401).json({ log: "Su token a expirado, vuelva a iniciar sesion" })
      return
    }
    citas.destroy({
      where: {
        codigo: id
      }
    }).then((d: any) => {
      if (d === 1) {
        res.status(200).json({ log: "La cita se elimino con exito" })
        return
      }
      res.status(400).json({ log: "La cita no se elimino, no existe cita registrados con esas credenciales" })
      return
    },
      (err: any) => {
        console.log(err);
        res.status(500).json({ log: "Error del servidor" });
        return;
      })
  }

  public async updateCita(req: Request, res: Response): Promise<void> {
    let id = req.params.id;
    let token = req.header("Authorization");
    if (id === undefined || req.body.nota === undefined) {
      res.status(400).json({ log: "Debe ingresar datos validos" })
      return
    }
    if (token === undefined) {
      res.status(400).json({ log: "La informacion enviada no es valida, el token de autenticacion no fue enviado" })
      return
    }
    let validador = util.validarToken(token);
    if (!validador.valido) {
      res.status(401).json({ log: "Su token a expirado, vuelva a iniciar sesion" })
      return
    }
    let date = new Date(Date.parse(req.body.fecha))
    citas.update({
      
      nota: req.body.nota,
      titulo: req.body.titulo,
      id_medico: req.body.id_medico,
      id_paciente: req.body.id_paciente,
      updatedAt: new Date(),
      fecha: date.toDateString(),
      hora: date.toTimeString().split(" ")[0] //  time: 13:36:47 GMT-0500 (hora de Ecuador)

    }, {
      where: {
        codigo: id

      }
      }).then((rs: any) => {
        if (rs[0] === 1) {
          res.status(200).json({ log: "La cita fue actualizada" })
          return
        }
        res.status(400).json({ log: "La cita no existe" })
        return
      },
        (err: any) => {
          console.log(err);
          res.status(500).json({ log: "Error del servidor" });
          return;
        })

  }

  public async updateCitaAtender(req: Request, res: Response): Promise<void> {
    let id = req.params.id;
    let token = req.header("Authorization");
    if (id === undefined || req.body.nota === undefined) {
      res.status(400).json({ log: "Debe ingresar datos validos" })
      return
    }
    if (token === undefined) {
      res.status(400).json({ log: "La informacion enviada no es valida, el token de autenticacion no fue enviado" })
      return
    }
    let validador = util.validarToken(token);
    if (!validador.valido) {
      res.status(401).json({ log: "Su token a expirado, vuelva a iniciar sesion" })
      return
    }
    let date = new Date(Date.parse(req.body.fecha))
    citas.update({
      nota: req.body.nota,
      is_active: false
    }, {
      where: {
        codigo: id

      }
      }).then((rs: any) => {
        if (rs[0] === 1) {
          res.status(200).json({ log: "La cita fue atendida." })
          return
        }
        res.status(400).json({ log: "La cita no existe" })
        return
      },
        (err: any) => {
          console.log(err);
          res.status(500).json({ log: "Error del servidor" });
          return;
        })

  }
}

export default new CitasController();
