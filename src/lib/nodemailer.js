//@ts-ignore
import nodemailer from 'nodemailer';

// GMAIL VERSION
const email = process.env.CONTACTFORM_EMAIL;
const password = process.env.CONTACTFORM_EMAIL_PASSWORD;

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: password,
    },
});

export const mailOptions = {
    from: email,
    to: email,
};