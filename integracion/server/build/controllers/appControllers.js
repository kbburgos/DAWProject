"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class AppController {
    index(req, res) {
        database_1.default.query("select * from medic", (err, rows) => {
            res.json(rows);
        });
        //  res.send("games")
    }
}
exports.default = new AppController();
