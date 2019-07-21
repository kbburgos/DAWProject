import {Request, Response } from "express";

class IndexController {
  public index(req: Request,res: Response){
    res.send("hello 2")
  }
}
export default  new IndexController();
