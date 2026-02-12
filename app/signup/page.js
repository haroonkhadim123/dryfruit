"use client";

import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "../component/Loader";
import Link from "next/link";

export default function RegisterPage() {
    const router=useRouter();
const [showPassword, setShowPassword] = useState(false);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loader, setloader] = useState(false)
const [error, seterror] = useState({name:'',email:'',password:''})


const handleSubmit = async(e) => {
e.preventDefault();

seterror({name:'',email:'',password:''})
const isAllEmpty =
  !name.trim() &&
  !email.trim() &&
  !password.trim() 

if (isAllEmpty) {
  seterror({
    name: "Name is required.",
    email: "Email is required.",
    password: "Password  is required.",
  
  });
  return;
}
if (!name.trim()) {
  seterror(prev => ({ ...prev, name: "Name is required" }));
  return;
}

    const regex = /^[A-Za-z\s]+$/;


    if (!regex.test(name)) {
      seterror(prev => ({
      ...prev,
      name: "Please enter a valid name (letters only)"
    }));
    return;
  }
 

    if (name?.length < 3) {
     seterror(prev => ({
      ...prev,
      name: "Please enter atleat 3 character"
    }));
    return;
  }
  if (!email.trim()) {
  seterror(prev => ({ ...prev, email: "Email is required" }));
  return;
}

   const re = /^[^\s@]+@[^\s@]+\.com$/;


    if (!re.test(email)) {
       seterror(prev => ({
      ...prev,
      email: "Please enter a valid email address"
    }));
    return;
  }
  if (!password.trim()) {
  seterror(prev => ({ ...prev, password: "password is required" }));
  return;
}

    if (password?.length < 6) {
       seterror(prev => ({
      ...prev,
      password: "password must be atleast 6 character long!"
    }));
    return;
  }
  
setloader(true)
 try {
      const res= await fetch('/api/user',{
         method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({name,email,password}),
    });
    const data= await res.json();
   
    if(data.success){
        toast.success(data.message)
router.push('/login')
    setEmail('');
    setName('');
    setPassword('')

      return
    }
    else{
      toast.error(data.message)
   
     

    }

    
      
    } catch (error) {
     console.error(error);
    toast.error("Something went wrong while creating account.");
      
    }
    finally{
      setloader(false)
    }
  



};

return ( <div className="py-24 flex items-center justify-center ">

  <form
    onSubmit={handleSubmit}
    className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
  >

    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
      Create an account
    </h2>

    {/* Name */}
    <div className="mb-4 relative">
      <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
       
        autoComplete="off"
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-600"
      />
      {error && error.name && (
        <p className="text-red-500 text-sm mt-1">{error.name}</p>
      )}
    </div>

    {/* Email */}
    <div className="mb-4 relative">
      <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
     
        autoComplete="off"
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-600"
      />
            {error && error.email && (
        <p className="text-red-500 text-sm mt-1">{error.email}</p>
      )}
      
    </div>

    {/* Password */}
    <div className="mb-6 relative">
      <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
    
        autoComplete="off"
        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-600"
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
            {error && error.password && (
        <p className="text-red-500 text-sm mt-1">{error.password}</p>
      )}
    </div>

<button
  type="submit"
  disabled={loader}
  className={`w-full h-[52px] flex items-center justify-center rounded-2xl font-semibold transition
    ${loader 
      ? 'bg-gray-400 cursor-not-allowed' 
      : 'bg-black text-white hover:bg-yellow-500'
    }`}
>
  {loader ? <Loader /> : 'Sign Up'}
</button>


    {/* Login link */}
    <div className="text-center mt-4 text-sm text-gray-600">
      <span>
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-slate-800 hover:underline"
        >
          Login
        </Link>
      </span>
    </div>

  </form>
</div>

);
}
