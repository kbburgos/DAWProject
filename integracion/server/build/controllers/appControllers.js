"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __importDefault(require("./../util"));
class AppController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = util_1.default.crearToken("0924995426");
            res.send(token);
        });
    }
    validar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let val = util_1.default.validarToken(req.params.token);
            console.log(val);
            res.send("hola");
        });
    }
}
//req.params.nombre
//res,status(404).json({aqui el json})
exports.default = new AppController();
