import * as crypto from 'crypto-js';
export default class Encrypt{
    public static cifrar( cadena:String):string {
        return crypto.SHA256(cadena).toString(crypto.enc.Hex);
      }
}