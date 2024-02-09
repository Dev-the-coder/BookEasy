import React, { useContext, useState } from 'react'
import '../App.css';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(UserContext);

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post('/login', { email, password });
            setUser(data);
            setRedirect(true);
        }
        catch (e) {
            setRedirect(false)
            alert("Wrong Credentials")
        }
    }
    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className=" flex grow justify-around items-center">
            <div className=" border-t-8 rounded-sm border-primary bg-white p-8 shadow-2xl w-96">
                <h1 className="font-bold text-center block text-2xl mb-8">Log In</h1>
                <form onSubmit={handleLoginSubmit}>
                    <input type='email' className="text-gray-500 block mt-3 border m-auto px-5 py-3 w-full rounded-full border-gray-200"
                        onChange={ev => setEmail(ev.target.value)}
                        value={email} placeholder="Email" />
                    <input type='password' className="text-gray-500 block mt-3 border m-auto px-5 py-3 w-full rounded-full border-gray-200"
                        onChange={ev => setPassword(ev.target.value)}
                        value={password} placeholder="Password" />
                    <button className="mt-6  transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-secondary focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg" value="Submit" >
                        Submit
                    </button>
                    <div className='text-center py-2 text-gray-500'>Don't have an account yet? <Link className='underline text-black' to={'/register'}>Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}



