'use client'

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, {  useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
         e.preventDefault();

 
       const res = await signIn('credentials', {
            email,
            password,
            redirect: false
         })

         if (res?.error) {
            console.log(res?.error);
         }else{
            router.push('/')
         }
    }
    return (
       <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
    <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="submit"
        value="Login"
        className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700 transition"
      />
    </form>

    <div>
    <p className="text-gray-600">
        {/* Don't have an account?{' '} */}
        <Link href="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
  </div>
  </div>

  
</div>

    );
};

export default Login;