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
const request = require('request');
const mail_1 = __importDefault(require("./../mail"));
class MailController {
    enviarMail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { firstname, lastname, country, email, subject } = req.body;
            if (firstname == null || lastname == null || country == null || email == null || subject == null) {
                res.json({ log: "faltan datos." });
                return;
            }
            if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
                res.json({ "responseError": "Please select captcha first" });
                return;
            }
            const secretKey = "6LfiTLYUAAAAACkDDuQDUa0JjHmtuFgjlF9XrWPm";
            const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
            request(verificationURL, function (error, response, body) {
                body = JSON.parse(body);
                if (body.success !== undefined && !body.success) {
                    res.render("mail", { mensaje: "No se ha completado el captcha, su correo no fue enviado." });
                    return;
                }
                let correoP = "" + process.env.MAIL_SEND;
                let pass = "" + process.env.PASS_SEND;
                let mensaje = "";
                mensaje += "Nombre: " + firstname + "<br>";
                mensaje += "Apellidos: " + lastname + "<br>";
                mensaje += "Remitente: " + email + "<br>";
                mensaje += "Ciudad: " + country + "<br>";
                mensaje += "Descripción del mensaje: " + "<br>";
                mensaje += subject;
                let mail = email + ", " + correoP;
                mail_1.default.enviar(correoP, pass, mail, mensaje);
                res.render("mail", { mensaje: "Gracias, pronto te contactaremos." });
                return;
            });
        });
    }
}
exports.default = new MailController();
