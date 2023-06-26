// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { mailOptions, transporter } from "../../../lib/nodemailer";


const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<any>
) => {

    if (req.method === "POST") {
        const data = req.body;
        if (!data.user_name || !data.user_email || !data.subject || !data.message) {
            return res.status(400).json({ message: 'Bad Request' })
        };

        try {
            await transporter.sendMail({
                ...mailOptions,
                subject: data.subject,
                text: "This is a test string",
                html: `
                    <h1>Message from ${data.user_name} </h1>
                    <h2>EMAIL: ${data.user_email}</h2>
                    <h2>SUBJECT: ${data.subject}</h2>
                    <p>${data.message}</p>
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
