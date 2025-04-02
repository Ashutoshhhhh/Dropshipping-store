import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation, useRegisterUserMutation } from '../../redux/features/auth/authApi';
const Register = () => {
    const[message,setMessage]=useState('');
    const[userName,setUserName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const [registerUser,states]=useRegisterUserMutation();
    const handleregister=async(e)=>{
        e.preventDefault();
        const data={email,password,userName};
        try{
            const response = await registerUser(data).unwrap();
            setMessage('Account Created Successfully');
            setTimeout(()=>{navigate('/login')},1200)
            
            
        }
        catch(err){
            setMessage('Please provide valid cred')
        }

    }
  return (
    <section className='h-screen flex items-center justify-center'>
        <div className='max-w-sm border shadow bg-white mx-auto p-8'>
            <h2 className='text-2xl font-semibold pt-5'>Please Register</h2>
            <form onSubmit={handleregister} className='space-y-5 max-w-sm mx-auto pt-8'>
            <input type='text'
                onChange={(e)=>setUserName(e.target.value)}
                placeholder='Username'
                name='username'
                id='username'
                required
                className='w-full bg-gray-100 focus:outline-none px-5 py-3'
                />
                <input type='email'
                onChange={(e)=>setEmail(e.target.value)}
                placeholder='Email'
                name='email'
                id='email'
                required
                className='w-full bg-gray-100 focus:outline-none px-5 py-3'
                />

                <input type='password'
                onChange={(e)=>setPassword(e.target.value)}
                placeholder='Password'
                name='password'
                id='password'
                required
                className='w-full bg-gray-100 focus:outline-none px-5 py-3'
                />
                {
                    message && <p className='text-red-500'>{message}</p>
                }
                <button type='submit' className='w-full top-5 bg-primary hover:bg-indigo-500 font-medium py-3 rounded-md '>Sign Up</button>  

            </form>
            <p className='my-5 italic text-sm text-center'>Already have an account <Link to='/login'
            
            className='text-red-500 underline'>Login</Link> here.</p>
        </div>
        
    </section>
    
  )
}

export default Register
