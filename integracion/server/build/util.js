"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constantes_1 = __importDefault(require("./constantes"));
// import pool from "./database";
var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");
class util {
    static cifrar(tipo, cadena) {
        let clave = "71bec6b99ebd7fbd65d44410eeaf17852de12204f176635b200c17986534d8cfbbab73a34baf7f91f567b90f76d74d61ab6e30f097ed4f49f24d11581527b89a";
        let retorno = "";
        if (tipo == 1) {
            retorno = AES.encrypt(cadena, clave).toString().replace(/\//gi, "-");
        }
        else {
            let cade = cadena.replace(/-/gi, "/");
            let bytes = AES.decrypt(cade, clave);
            retorno = bytes.toString(CryptoJS.enc.Utf8);
        }
        return retorno;
    }
    static crearToken(user) {
        const fecha = new Date();
        return this.cifrar(1, fecha.getTime() + "," + user);
    }
    static validarToken(token) {
        let tiempo_actual = new Date();
        let tokenC = this.cifrar(2, token);
        let arreglo = tokenC.split(",");
        if ((parseInt(arreglo[0]) - tiempo_actual.getTime()) <= constantes_1.default.tiempoDoctor.tiempo) {
            return { valido: true, rol: arreglo[2] };
        }
        return ({ valido: false });
    }
    static cifrarSha256(pass) {
        return CryptoJS.SHA256(pass).toString(CryptoJS.enc.Hex);
    }
}
exports.default = util;
