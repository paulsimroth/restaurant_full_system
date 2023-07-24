import ContactForm from "~/components/ContactForm";
import Map from "~/components/Map";


function Contact() {

    const comname = process.env.NEXT_PUBLIC_COMNAME;
    const name = process.env.NEXT_PUBLIC_NAME;
    const address = process.env.NEXT_PUBLIC_ADDRESS;
    const city = process.env.NEXT_PUBLIC_CITY;
    const country = process.env.NEXT_PUBLIC_COUNTRY;
    const phone = process.env.NEXT_PUBLIC_PHONE;
    const email = process.env.NEXT_PUBLIC_EMAIL;

    return (
        <section className='w-[100vw] h-fit px-4 md:px-24 p-6 flex flex-col items-center justify-center bg-white' id='contact'>
            <h3 className='text-[50px] md:text-[70px] text-[#1C2331] font-semibold mt-16 mb-4'>CONTACT</h3>
            <div className='w-full flex flex-col lg:flex-row text-[#1C2331]'>

                <div className='w-full lg:w-2/3 h-fit m-2 border-4 border-[#1C2331]'>
                    <Map />
                </div>

                <div className='w-fit min-w-[290px] min-h-2/3 h-fit md:w-full md:m-2 p-2 text-justify flex flex-col md:flex-row lg:flex-col items-center justify-center wrap'>

                    <div className='m-2'>
                        <p className='text-[25px] text-[#1C2331]'>
                            You can find us at:
                        </p>
                        <div className='p-1'>
                            <p>{comname}</p>
                            <p>{address}</p>
                            <p>{city}</p>
                        </div>
                    </div>

                    <br />

                    <div className='m-2'>
                        <p className='text-[25px] text-[#1C2331]'>
                            Opening Hours:
                        </p>
                        <ul className='p-1'>
                            <li>Mo: Ruhetag</li>
                            <li>Di-Fr: 11:00-21:00</li>
                            <li>Sa-So/Feiertag: 10:00-23:00</li>
                        </ul>
                        <p className='p-1'><strong>EMAIL:</strong>{email}</p>
                        <p className='p-1'><strong>TEL.:</strong>{phone}</p>
                    </div>

                </div>

                <div className='w-full lg:w-2/3 md:m-2 flex flex-col my-4'>
                    <ContactForm />
                </div>
            </div>
        </section>
    )
};

export default Contact;