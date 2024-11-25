'use client';
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import InputField from "@/components/InputField";

export default function RegistePage() {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      address: '',
      phone: '',
    });
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();
    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (formData.password !== formData.confirmPassword) {
        setMessage('Passwords do not match');
        setIsSuccess(false);
        return;
      }
      try {
        const response = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        console.log("My response", response)
        const data = await response.json();
        if (response.ok) {
          setMessage('Registration succesful');
          setIsSuccess(true);
          router.push('/auth/login')
        } else {
          setMessage(data.message || 'Registration failed')
          setIsSuccess(false);
        }
      } catch (error) {
        setMessage('An error occurred')
        setIsSuccess(false);
      }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h2 className="text-2xl font-bold mb-4">Sing up</h2>
            <form className="bg-gray-800 p-6 rounded-lg w-full max-w-md" onSubmit={handleSubmit}>
                <InputField label="Name" type="text" name="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} />
                <InputField label="Email" type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                <InputField label="Address" type="text" name="address" placeholder="Enter your address" value={formData.address} onChange={handleChange} />
                <InputField label="Phone" type="text" name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} />
                <InputField label="Password" type="password" name="password" placeholder="Enter your password" onChange={handleChange} />
                <InputField label="Confirm Password" type="password" name="confirmPassword" placeholder="Confirm your password" onChange={handleChange} />
                <Button text="Sign up" className="w-full mt-4" />
            </form>
            <p className="mt-4">
                Already have an account? <Link href="/auth/login" className="text-blue-500">Sign in</Link>
            </p>
            {message && <p className={`mt-4 ${isSuccess ? "text-green-500" : "text-red-500"}`}>{message}</p>}
        </div>
    );
}