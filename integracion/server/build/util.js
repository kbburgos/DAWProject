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
const constantes_1 = __importDefault(require("./constantes"));
const database_1 = __importDefault(require("./database"));
var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");
class util {
    static cifrar(tipo, cadena) {
        let clave = "71bec6b99ebd7fbd65d44410eeaf17852de12204f176635b200c17986534d8cfbbab73a34baf7f91f567b90f76d74d61ab6e30f097ed4f49f24d11581527b89a";
        let retorno = "";
        if (tipo == 1) {
            retorno = AES.encrypt(cadena, clave).toString();
        }
        else {
            let bytes = AES.decrypt(cadena, clave);
            retorno = bytes.toString(CryptoJS.enc.Utf8);
        }
        return retorno;
    }
    static crearToken(user) {
        const fecha = new Date();
        return fecha.getTime() + "," + this.cifrar(1, user);
    }
    static validarToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let tiempo_actual = new Date();
            let arreglo = token.split(",");
            let users = this.cifrar(2, arreglo[1]);
            if ((parseInt(arreglo[0]) - tiempo_actual.getTime()) <= constantes_1.default.tiempoDoctor.tiempo) {
                let rows = yield database_1.default.query("select cedula from usersist where cedula=?", [users]);
                if (rows.length == 1) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        });
    }
}
exports.default = util;
