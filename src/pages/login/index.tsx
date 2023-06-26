'use client'
import Navbar from '../../sections/Navbar';
import Footer from '../../sections/Footer';
import { ChangeEvent, useState } from 'react';

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
        <main>
            <Navbar />
            <div className="bg-[#1C2331] text-[#FFA500] mt-12 flex min-h-screen flex-col items-center justify-between p-24">
                LOGIN
                <form className='mt-8 space-y-6'>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div>
                        <p className='pb-1 text-sm text-red-600'>{/* {error && 'Invalid Login credentials'} */}</p>
                        <div>
                            <label htmlFor="email-address">
                                Email Address
                            </label>
                            <input
                                id='email'
                                type="email"
                                autoComplete='email'
                                value={input.email}
                                required
                                placeholder='email'
                                onChange={e => handleChange}
                            />
                        </div>
                        <div>
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
                                placeholder='password'
                                onChange={e => handleChange}
                            />
                        </div>
                        <button
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
    )
};

export default page;