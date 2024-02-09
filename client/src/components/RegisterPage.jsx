import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function RegisterPage() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function registerUser(ev) {
        ev.preventDefault();
        try {
            await axios.post('/register', {
                name,
                email,
                password,
            })
            alert("registration successful")
        } catch (error) {
            alert('registration failed')
        }
    }

    return (
        <div className=" flex grow justify-around items-center">
            <div className=" border-t-8 rounded-sm border-primary bg-white p-8 shadow-2xl w-96">
                <h1 className="font-bold text-center block text-2xl mb-8">Register</h1>
                <form onSubmit={registerUser}>
                    <input className="text-gray-500 block mt-3 border m-auto px-5 py-3 w-full rounded-full border-gray-200" type="name"
                        value={name} placeholder="Name" autofocus={true} onChange={ev => setName(ev.target.value)} />
                    <input className="text-gray-500 block mt-3 border m-auto px-5 py-3 w-full rounded-full border-gray-200" type="email"
                        value={email} placeholder="Email" autofocus={true} onChange={ev => setEmail(ev.target.value)} />
                    <input className="text-gray-500 block mt-3 border m-auto px-5 py-3 w-full rounded-full border-gray-200" type="password"
                        value={password} placeholder="Password" onChange={ev => setPassword(ev.target.value)} />
                    <button className="mt-6  transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-secondary focus:bg-indigo-900  transform hover:-translate-y-1 hover:shadow-lg" value="Submit" >
                        Register
                    </button>
                    <div className='text-center py-2 text-gray-500'>Already a member? <Link className='underline text-black' to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
