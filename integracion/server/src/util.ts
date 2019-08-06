import constantes from './constantes';
// import pool from "./database";
var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");

export default class util {
  public static cifrar(tipo:number, cadena:String):String {
    let clave = "71bec6b99ebd7fbd65d44410eeaf17852de12204f176635b200c17986534d8cfbbab73a34baf7f91f567b90f76d74d61ab6e30f097ed4f49f24d11581527b89a"
    let retorno = "";
    if(tipo == 1){
      retorno =  AES.encrypt(cadena,clave).toString();
    }
    else {
      let bytes = AES.decrypt(cadena,clave);
      retorno = bytes.toString(CryptoJS.enc.Utf8);
    }
    return retorno;
  }

  public static crearToken(user:String):String {
    const fecha= new Date();
    return this.cifrar(1,fecha.getTime()+","+user);
  }

  public static validarToken(token:String):any {
    let tiempo_actual = new Date();

    let tokenC = this.cifrar(2,token);
    let arreglo = tokenC.split(",");
    if((parseInt(arreglo[0])-tiempo_actual.getTime()) <= constantes.tiempoDoctor.tiempo){
      return {valido : true, rol: arreglo[2]}
    }
    return ({valido : false});
  }
  public static cifrarSha256(pass:String):String{
    return CryptoJS.SHA256(pass).toString(CryptoJS.enc.Hex)
  }
}
