"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require('nodemailer');
class Mail {
    // async..await is not allowed in global scope, must use a wrapper
    enviar(from, pass, to, htmlBody) {
        return __awaiter(this, void 0, void 0, function* () {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            //let testAccount = await nodemailer.createTestAccount();
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: 'smtp-mail.outlook.com',
                port: 587,
                secure: false,
                auth: {
                    user: from,
                    pass: pass // generated ethereal password
                }
            });
            // send mail with defined transport object
            let info = yield transporter.sendMail({
                from: '"Soporte, atención al cliente sis-medic-tbs 👻" ' + from,
                to: to,
                subject: 'Correo de contacto del sistema. ✔',
                //text: 'Hello world?', // plain text body
                html: htmlBody // html body
            });
            console.log('Message sent: %s', info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    }
}
exports.default = new Mail();
