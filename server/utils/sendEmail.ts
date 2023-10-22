import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_USERNAME, // generated ethereal user
        pass: process.env.BREVO_PASSWORD, // generated ethereal password
    },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(activationToken: string, email: string) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: "<anvarmusa12@gmail.com>", // sender address
        to: email, // list of receivers
        subject: "Account activation - Oxillia", // Subject line
        // text: "Hello world?", // plain text body
        html: `<div style="font-family: sans-serif;">
                    <p>Hello, thank you for signin up!</p>
                    <p>Please activate your account to start using Oxillia.</p>
                    <a href="${process.env.HOME_URL}/verify?token=${activationToken}" style="background-color: #6739ff; color: #fff; text-decoration: none; padding: 10px 15px; margin-top: 5px; display: inline-block; border-radius:10px;">Activate</a>
                </div>
                `, // html body
    });

    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    if (info) {
        return info.messageId;
    }
}

export default sendEmail;
