// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { mailOptions, transporter } from '~/lib/nodemailer';
import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";

/**
 * handler for sending booking form filled out during booking
 * @param req POST request to Nodemailer to send booking form to specified email address
 * @param res STATUS of request
 * @returns @param res
 */

const date = new Date();

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<any>
) => {

    if (req.method === "POST") {
        const data = req.body;
        if (!data.name || !data.surname || !data.email || !data.phone || !data.seats || !data.selectedTime) {
            return res.status(400).json({ message: 'Bad Request' })
        };

        const day = format(parseISO(data.selectedTime), 'do MMM yyyy' , {locale: de});
        const time = format(parseISO(data.selectedTime), 'kk:mm' , {locale: de})

        try {
            await transporter.sendMail({
                ...mailOptions,
                subject: `NEW BOOKING`,
                text: "This is a test string",
                html: `
                    <h1>TABLE BOOKING FROM ${data.name} ${data.surname} </h1>
                    <br />
                    <h2>EMAIL: ${data.email}</h2>
                    <h2>TEL.: ${data.phone}</h2>
                    <br />
                    <h2>RESERVED SEATS: ${data.seats.value}</h2>
                    <h2>RESERVED TIME: ${day} at ${time}</h2>
                    <br />
                    <p>Additional message: ${data.message}</p>
                    <br />
                    <p>message sent: ${data.sentAt}</p>
                `
            });

            return res.status(200).json({ success: true });
        } catch (error: any) {
            console.log(error);
            return res.status(400).json({ message: `ERROR: ${error.message}` })
        }
    }

    return res.status(400).json({ message: 'Bad Request' })
};

export default handler;
