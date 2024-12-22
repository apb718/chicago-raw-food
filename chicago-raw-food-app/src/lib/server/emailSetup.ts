// @ts-ignore
import nodemailer from "nodemailer";
import { GOOGLE_EMAIL, GOOGLE_EMAIL_PASSWORD} from "$env/static/private";
import { log } from "$lib/server/logUtils.ts";

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: GOOGLE_EMAIL,
        pass: GOOGLE_EMAIL_PASSWORD,
    },
});

transporter.verify(async function (error: any, success: any) {
    if (error) {
        await log("WARN", error);
    } else {
        await log("INFO", `${success}, Email server ready to take messaages`);
    }
});

export default transporter;