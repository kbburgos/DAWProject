import * as crypto from 'crypto-js';
export default class Encrypt{
  private static clave = "71bec6b99ebd7fbd65d44410eeaf17852de12204f176635b200c17986534d8cfbbab73a34baf7f91f567b90f76d74d61ab6e30f097ed4f49f24d11581527b89a"

    public static cifrar( cadena:String):string {
        return crypto.SHA256(cadena).toString(crypto.enc.Hex);
      
    }

    public static validadUser(cadena:string):boolean{
      try{
        let cade = cadena.replace(/-/gi,"/");
      let bytes =crypto. AES.decrypt(cade,this.clave);
      return bytes.toString(crypto.enc.Utf8)==="administrador";
      }catch(e){
        return false;
      }
      
    }
}