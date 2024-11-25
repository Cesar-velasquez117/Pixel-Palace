'use client';
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import InputField from "@/components/InputField";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`${API_URL}/auth/login`, {
          method:  'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
          setMessage('Login succesful');
          setIsSuccess(true);
          localStorage.setItem('token', data.token);
          router.push('/')
        } else {
          setMessage(data.message || 'Something went wrong');
          setIsSuccess(false);
        }
      } catch (error) {
        setMessage('An error occurred');
        setIsSuccess(false);
      }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h2 className="text-2xl font-bold mb-4">Sign in</h2>
            <form className="bg-gray-800 p-6 rounded-lg w-full max-w-md" onSubmit={handleSubmit}>
                <InputField label="Email" type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                <InputField label="Password" type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
                <Button text="Sign in" className="w-full mt-4" />
            </form>
            <p className="mt-4">
                Don't have an account? <Link href="/auth/register" className="text-blue-500">Sign up</Link>
            </p>
            {message && <p className={`mt-4 ${isSuccess ? "text-green-500" : "text-red-500"}`}>{message}</p>}
        </div>
    );
}