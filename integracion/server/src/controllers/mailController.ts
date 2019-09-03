import { Request, Response } from "express";
const request = require('request');
import Mail from "./../mail";

class MailController {

    public async enviarMail(req: Request, res: Response): Promise<void> {
        let{firstname,lastname,country,email,subject} = req.body;
        if(firstname==null || lastname==null || country==null || email==null || subject==null){
            res.json({log: "faltan datos."});
            return;
        }
        if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
            res.json({ "responseError": "Please select captcha first" });
            return;
        }
        const secretKey = "6LfiTLYUAAAAACkDDuQDUa0JjHmtuFgjlF9XrWPm";
        const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
        request(verificationURL, function (error:any, response:any, body:any) {
            body = JSON.parse(body);
            if (body.success !== undefined && !body.success) {
                res.render("mail",{mensaje: "No se ha completado el captcha, su correo no fue enviado."});
                return;
            }
            let correoP = ""+process.env.MAIL_SEND;
            let pass = ""+process.env.PASS_SEND;
            let mensaje = "";
            mensaje += "Nombre: " +firstname +"<br>";
            mensaje += "Apellidos: " + lastname + "<br>";
            mensaje += "Remitente: " + email + "<br>";
            mensaje += "Ciudad: " + country +"<br>";
            mensaje += "Descripción del mensaje: " + "<br>";
            mensaje += subject;
            let mail = email + ", " + correoP
            Mail.enviar(correoP,pass,mail,mensaje);
            res.render("mail",{mensaje: "Gracias, pronto te contactaremos."});
            return;
        });
    }

}
export default new MailController();