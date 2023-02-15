import dotenv from 'dotenv';
import nodemailer from 'nodemailer'

dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
    },
    tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
    },
});

async function sendNodemailer (email: string, password: string) {
    const mailSend = await transporter.sendMail({
        from: process.env.NODEMAILER_USER,
        to: email,
        subject: "Redefinição de senha",
        text: `Sua nova senha é: ${password}`
    })
    return mailSend;
}

export default sendNodemailer;