import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';

export default function Login({setCurrentPage}) {
  const [email, setEmail] = useState("");
  const[password, setPassword]=useState("");
  const[error, setError]=useState(null);

  const navigate=useNavigate();

  // Handle Login Form Submit
  const handleLogin= async(e)=>{
    e.preventDefault();
    
    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
    }
    if(!password){
      setError("Please enter a password");
      return;
    }
    setError("");

    // Login API call
    try {
      
    } catch (error) {
      
    }
  };
  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-bold text-black'>Welcome Back</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please enter your details to login</p>

      <form onSubmit={handleLogin}>
        <Input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} label="Email Address" placeholder="john@example.com"/>
        <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} label="Password" placeholder="Min 8 characters"/>

        {error && <p className='text-red-600 text-xs pb-2.5'>{error}</p>}

        <button type='submit' className='btn-primary'>LOGIN</button>

        <p className='text-[13px] text-slate-800 mt-3'>Don't have an account?{" "}
          <button className='font-medium text-primary  underline cursor-pointer' onClick={()=>{
            setCurrentPage("signup");
          }}>
            SignUp
          </button>
        </p>
      </form>
    </div>
  )
}
