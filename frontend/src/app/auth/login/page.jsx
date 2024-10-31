import Link from "next/link";
import Button from "@/components/Button";
import InputField from "@/components/InputField";

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h2 className="text-2xl font-bold mb-4">Sign in</h2>
            <form className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
                <InputField label="Email" type="email" name="email" placeholder="Enter your email" />
                <InputField label="Password" type="password" name="password" placeholder="Enter your password" />
                <Button text="Sign in" className="w-full mt-4" />
            </form>
            <p className="mt-4">
                Don't have an account? <Link href="/auth/register" className="text-blue-500">Sign up</Link>
            </p>
        </div>
    );
}