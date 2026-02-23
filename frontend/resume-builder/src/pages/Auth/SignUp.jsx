import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import { useState } from 'react';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';

export default function SignUp({setCurrentPage}) {
  const[profilePic, setProfilePic]=useState(null);
  const[fullname, setFullname]=useState("");
  const[email, setEmail]=useState("");
  const[password, setPassword]=useState("");

  const[error, setError]=useState(null);
  
  const navigate=useNavigate();

  // Handle SignUP form submit
  const handleSignUp=(e)=>{
    e.preventDefault();

    let profileImageUrl="";

    if(!fullname){
      setError("Please provide the full name");
      return;
    }
    if(!validateEmail(email)){
      setError("Please enter a valid email");
      return;
    }
    if(!password){
      setError("Please enter the password");
      return;
    }
    setError("");

    // SignUp API call
    try {
      
    } catch (error) {
      
    }
  }
  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col '>
      <h3 className='text-lg font-semibold  text-black'>Create an Account</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignUp}>

        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>

        <div className='grid grid-cols-1 md:grid-cols-1 gap-2'>
          <Input
           value={fullname}
           onChange={(e)=>setFullname(e.target.value)}
           label="Full Name"
           placeholder="John"
           type="text"
          />

          <Input
           value={email}
           onChange={(e)=>setEmail(e.target.value)}
           label="Email"
           placeholder="john@example.com"
           type="email"
          />

          <Input
           value={password}
           onChange={(e)=>setPassword(e.target.value)}
           label="Password"
           placeholder="Min 8 characters"
           type="password"
          />
        </div>

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

        <button type='submit' className='btn-primary'>SIGN UP</button>

        <p className='text-[13px] text-slate-800 mt-3'>Already an account?{""}
          <button className='font-medium text-primary underline cursor-pointer' onClick={()=>setCurrentPage("login")}>Login</button>
        </p>
      </form>
    </div>
  )
}
