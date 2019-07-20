import {Request, Response } from "express";
import pool from "../database";

class AppController {
  public index(req: Request,res: Response){
  pool.query("select * from medic",(err,rows) => {
    res.json(rows);
  });
  //  res.send("games")
  }
}
export default new AppController();
