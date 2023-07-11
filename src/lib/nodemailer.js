//@ts-ignore
import nodemailer from 'nodemailer';

/**
 * GMAIL VERSION of Nodemailer Contact Form
 * SETUP FOR TRANSPORT OF EMAIL
 *  For setting up Gmail to make sending emails via contact form possible
 * 
 *  Create & use app passwords
 *  Go to your Google Account.
 *  Select Security.
 *  Under "Signing in to Google," select 2-Step Verification.
 *  At the bottom of the page, select App passwords.
 *  Enter a name that helps you remember where you'll use the app password.
 *  Select Generate.
*/

const email = process.env.NEXT_PUBLIC_CONTACTFORM_EMAIL;
const password = process.env.NEXT_PUBLIC_CONTACTFORM_EMAIL_PASSWORD;

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