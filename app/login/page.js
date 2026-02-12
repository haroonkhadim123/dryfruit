"use client";

import { useState, useEffect } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "../component/Loader";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setloader] = useState(false)
  const [error, seterror] = useState({email:'',password:''})

  // ✅ Redirect after successful login
  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.role === "admin") {
        router.push("/admin");
        toast.success("Welcome to Admin Dashboard!")
      } else {
        router.push("/");
        toast.success("Login successfully")
      }
    }
  }, [status, session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    seterror({email:'',password:''});
    const isAllEmpty =

  !email.trim() &&
  !password.trim() 

if (isAllEmpty) {
  seterror({
   
    email: "Email is required.",
    password: "Password  is required.",
  
  });
  return;
}
      if (!email.trim()) {
  seterror(prev => ({ ...prev, email: "Email is required" }));
  return;
}

      const re = /^[^\s@]+@[^\s@]+\.com$/;


    if (!re.test(email)) {
      seterror({...error,email:"Please enter a valid email address."});
     
      return
    }
      if (!password.trim()) {
  seterror(prev => ({ ...prev, password: "password is required" }));
  return;
}


    setloader(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      toast.error(res.error);
      setloader(false);
      return;
    }
    if(res?.ok)
{
  setEmail('');
  setPassword('');
  setloader(false);
}    


  };

  return (
    <div className="py-20 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to your account
        </h2>

        {/* Email */}
        <div className="mb-4 relative">
          <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
         autoComplete="off"
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-600"
          />
           {error && error.email && (
        <p className="text-red-500 text-sm mt-1">{error.email}</p>
      )}
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
           autoComplete="off"
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-600"
          />
          {error && error.password && (
        <p className="text-red-500 text-sm mt-1">{error.password}</p>)}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
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
  {loader ? <Loader /> : 'Login'}
</button>

        <div className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/signup" className="font-semibold hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
