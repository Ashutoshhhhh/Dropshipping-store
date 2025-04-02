import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../../redux/features/auth/authApi';
import { setUser } from '../../redux/features/auth/authSlice';
const Login = () => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [loginUser,states] = useLoginUserMutation();
    const navigate=useNavigate();
    const dispatch= useDispatch()
    
    const handlelogin = async (e) => {
        
        e.preventDefault();
        const data = { email, password };
        console.log(email, password);
        try{
            
            const response = await loginUser(data).unwrap();
            const {user}= response;
            dispatch(setUser({user:user}));
           
            setMessage(`${response.message}`);
            navigate("/")

        }
        catch(err){
            setMessage(`Please provide valid email or password ${err.message}`)
        }

    }
    
    return (
        <section className='h-screen flex items-center justify-center'>
            <div className='max-w-sm border shadow bg-white mx-auto p-8'>
                <h2 className='text-2xl font-semibold pt-5'>Please LogIn</h2>
                <form onSubmit={handlelogin} className='space-y-5 max-w-sm mx-auto pt-8'>
                    <input type='email'
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        name='email'
                        id='email'
                        required
                        className='w-full bg-gray-100 focus:outline-none px-5 py-3'
                    />

                    <input type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        name='password'
                        id='password'
                        required
                        className='w-full bg-gray-100 focus:outline-none px-5 py-3'
                    />
                    {
                        message && <p className='text-red-500'>{message}</p>
                    }
                    <button type='submit' className='w-full top-5 bg-primary hover:bg-indigo-500 font-medium py-3 rounded-md '>Log In</button>

                </form>
                <p className='my-5 italic text-sm text-center'>Dont have an account <Link to='/register'

                    className='text-red-500 underline'>Register</Link> here.</p>
            </div>

        </section>

    )
}

export default Login
