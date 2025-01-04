import nodeMailer from "nodemailer";
import path from "path";
import dotenv from "dotenv";
import hbs from "nodemailer-express-handlebars";
import { fileURLToPath } from "node:url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendEmail = async (
    subject,
    send_to,
    send_from,
    reply_to,
    template,
    name,
    link
) => {
    const transporter = nodeMailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_SERVICE_PORT,
        secure: false,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
            ciphers: 'SSLv3'
        }
    })

    const handlebarsOptions = {
        viewEngine: {
            extName: ".handlebars",
            partialsDir: path.resolve(__dirname, "../views"),
            defaultLayout: false,
        },
        viewPath: path.resolve(__dirname, "../views"),
        extName: ".handlebars",
    }

    transporter.use('compile', hbs(handlebarsOptions))

    const mailOptions = {
        from: send_from,
        to: send_to,
        replyTo: reply_to,
        subject: subject,
        template: template,
        context: {
            name: name,
            link: link,
        },
    }

    try {
        const msgInfo = await transporter.sendMail(mailOptions)
        console.log('Message sent id:', msgInfo.messageId, `to ${send_to}`)
        return msgInfo
    } catch (error) {
        console.error('Error sending email:', error)
        throw error
    }
}

export default sendEmail