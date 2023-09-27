"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
});
// async..await is not allowed in global scope, must use a wrapper
function sendEmail() {
    return __awaiter(this, void 0, void 0, function* () {
        // send mail with defined transport object
        const info = yield transporter.sendMail({
            from: '<x@gmail.com>',
            to: "x@gmail.com",
            subject: "Hello ✔",
            text: "Hello world?",
            html: "<b>Hello world?</b>", // html body
        });
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        //
        // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
        //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
        //       <https://github.com/forwardemail/preview-email>
        //
    });
}
exports.default = sendEmail;
//# sourceMappingURL=sendEmail.js.map