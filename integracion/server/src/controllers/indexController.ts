import {Request, Response } from "express";
const db = require('./../../models');

const Op = require("sequelize").Op;
class IndexController {
  public index(req: Request,res: Response){
   
    res.json({log:"hello, world"})
    

  }
  
}
export default  new IndexController();
