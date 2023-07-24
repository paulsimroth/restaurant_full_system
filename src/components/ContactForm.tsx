'use client';

import { useState } from "react";
import Image from "next/image";
import { sendForm } from "~/lib/api";

type Input = {
    user_name: string
    user_email: string
    subject: string
    message: string
}

const initValues = {
    user_name: "",
    user_email: "",
    subject: "",
    message: "",
};

const initFormState = { values: initValues };

/**
 * CONTACT FORM USING NODEMAILER
 * Please visit Nodemailer Docs for more
 */
function ContactForm() {

    const [formState, setFormState] = useState(initFormState);
    const [processing, setProcessing] = useState<Boolean>(false);
    const [msgError, setMsgError] = useState<Boolean>(false);

    const { values } = formState;

    const handleChange = ({ target }: any) => setFormState((prev) => ({
        ...prev,
        values: {
            ...prev.values,
            [target.name]: target.value,
        },
    }));

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setProcessing(true);
        setMsgError(false);
        setFormState((prev) => ({
            ...prev,
        }))
        
        try {
            await sendForm(values);
            setProcessing(false);
            setMsgError(false);
            setFormState(initFormState);
        } catch (error) {
            setMsgError(true);
            setProcessing(false);
            setFormState((prev) => ({
                ...prev,
                error,
            }));
        };
    };

    return (
        <>
            <form>

            <div className='w-full flex flex-row items-center justify-start'>
                    <div className="relative w-[48%] h-fit mr-1.5">
                        <p className="px-3 text-[16px] md:text-[20px] flex flex-row">
                            Name
                            <Image src="/asterisk.svg" alt="required" width={15} height={15} className="m-1"/>
                        </p>
                        <input
                            className='w-full h-14 p-3 m-2 rounded-[15px] text-[16px] md:text-[23px] text-[#1C2331] bg-slate-200'
                            name="user_name"
                            type="text"
                            placeholder="Your Name"
                            value={values.user_name}
                            onChange={handleChange}
                            required
                        >
                        </input>
                    </div>

                    <div className="relative w-[48%] h-fit ml-1.5 md:m-2">
                        <p className="px-3 text-[16px] md:text-[20px] flex flex-row">
                            Email
                            <Image src="/asterisk.svg" alt="required" width={15} height={15} className="m-1"/>
                        </p>
                        <input
                            className='w-full h-14 p-3 my-2 md:m-2 rounded-[15px] text-[16px] md:text-[23px] text-[#1C2331] bg-slate-200'
                            name="user_email"
                            type="email"
                            placeholder="example@email.com"
                            value={values.user_email}
                            onChange={handleChange}
                            required
                        >
                        </input>
                    </div>
                </div>
                
                <div className="relative w-[98%]">
                    <p className="px-3 text-[16px] md:text-[20px] flex flex-row">
                        Subject
                        <Image src="/asterisk.svg" alt="required" width={15} height={15} className="m-1"/>
                    </p>
                    <input
                        className='w-full h-fit-content h-14 p-3 m-2 rounded-[15px] text-[16px] md:text-[23px] text-[#1C2331] bg-slate-200'
                        name="subject"
                        type="text"
                        placeholder="Your Subject"
                        value={values.subject}
                        onChange={handleChange}
                        required
                    >
                    </input>
                </div>
                <div className="relative w-[98%] ">
                    <p className="px-3 text-[16px] md:text-[20px] flex flex-row">
                        Message
                        <Image src="/asterisk.svg" alt="required" width={15} height={15} className="m-1"/>
                    </p>

                    <textarea
                        className='w-full min-h-[250px] p-3 m-2 rounded-[15px] text-[16px] md:text-[23px] text-[#1C2331] bg-slate-200'
                        name="message"
                        placeholder="Your Message"
                        value={values.message}
                        onChange={handleChange}
                        required
                    >
                    </textarea>
                </div>

                {!processing
                    ? <input
                    className="m-1 flex items-center h-fit border-2 border-[#FFA500] py-1 px-4 gap-[12px] text-[20px] font-bold hover:scale-110 hover:bg-[#7EC699] hover:text-[#2E3A59] duration-300"
                        type="submit"
                        value="Send"
                        onClick={onSubmit}
                        disabled={!values.user_name || !values.user_email || !values.subject || !values.message}
                    />
                    : <input
                        className="flex items-center h-fit border-2 border-[#FFA500] py-4 px-6 bg-red gap-[12px] cursor-progress"
                        type="submit"
                        value="Sending..."
                        onClick={onSubmit}
                    />
                }

                {msgError &&
                    <div className="p-6 m-4 bg-[#ff0000] rounded-md flex items-center h-fit w-fit">
                        <p className="font-extrabold text-[16px] text-white">ERROR, Failed to send!</p>
                    </div>
                }
            </form>
        </>
    )
};

export default ContactForm;