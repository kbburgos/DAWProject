const nodemailer = require('nodemailer');

class Mail {
    // async..await is not allowed in global scope, must use a wrapper
    async enviar(from: String, pass: String, to:String, htmlBody:String) {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        //let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: from, // generated ethereal user
                pass: pass // generated ethereal password
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" '+from, // sender address
            to: to, // list of receivers
            subject: 'Correo de contacto del sistema. ✔', // Subject line
            //text: 'Hello world?', // plain text body
            html: htmlBody // html body
        });
        console.log('Message sent: %s', info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
}

export default new Mail();