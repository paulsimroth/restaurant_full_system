'use client'
import Navbar from '../../sections/Navbar';
import Footer from '../../sections/Footer';
import { ChangeEvent, useState } from 'react';
import Head from 'next/head';

function page() {

    const [input, setInput] = useState({
        email: '',
        password: '',
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { value, name } = e.target
        setInput((prev) => ({ ...prev, [name]: value }))
    };

    return (
        <>
            <Head>
                <title>Admin Login</title>
                <meta name="description" content="Admin Login" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Navbar />
                <div className="bg-[#1C2331] text-[#FFA500] mt-12 flex min-h-screen flex-col items-center justify-center pt-24">
                    <h1>LOGIN</h1>
                    <form className='mt-8 space-y-6 flex flex-col items-center justify-center'>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className='w-2/3 h-1/2 text-[25px]'>
                            <p className='pb-1 text-sm text-red-600'>{/* {error && 'Invalid Login credentials'} */}</p>
                            <div className='my-2 mx-1'>
                                <label htmlFor="email-address" >
                                    Email Address
                                </label>
                                <input
                                    id='email'
                                    type="email"
                                    autoComplete='email'
                                    value={input.email}
                                    required
                                    placeholder='Email'
                                    onChange={e => handleChange}
                                />
                            </div>
                            <div className='my-2 mx-1'>
                                <label htmlFor="email-address">
                                    Password
                                </label>
                                <input
                                    id='password'
                                    name='password'
                                    type='password'
                                    autoComplete='current-password'
                                    value={input.password}
                                    required
                                    placeholder='Password'
                                    onChange={e => handleChange}
                                />
                            </div>
                            <button
                                className="my-2 m-1 flex items-center h-fit border-2 border-[#FFA500] py-1 px-4 gap-[12px] text-[20px] font-bold hover:scale-110 hover:bg-[#7EC699] hover:text-[#2E3A59] duration-300"
                                type='submit'
                                onClick={(e) => {
                                    e.preventDefault()
                                    /* login(input) */
                                }}>

                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
                <Footer />
            </main>
        </>
    )
};

export default page;