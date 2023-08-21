import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';// Import Link from react-router-dom
import createApiClient from '../apiclient/apiClient'; // Import the modified apiClient creator
import { useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom


const SignUp = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const useMicroserviceAParam = queryParams.get('useMicroserviceA');

    const useMicroserviceA = useMicroserviceAParam === 'true'; // Convert to boolean
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const baseUrl = useMicroserviceA ? 'http://localhost:9012' : 'http://localhost:9014';
    const apiClient = createApiClient(baseUrl);

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const response = await apiClient.post('/api/v1/users/create', {
                fullName,
                email,
                password
            });

            console.log('Sign-up successful:', response.data);

            // Handle successful sign-up here
           // Navigate to the Home component after successful sign-up
        navigate('/');
        } catch (error) {
            console.error('Sign-up failed:', error);
            // Handle sign-up error here
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="m-auto w-2/5 p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
                <form onSubmit={handleSignUp}>
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block mb-1 font-semibold">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            className="border p-2 w-full"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1 font-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="border p-2 w-full"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            className="border p-2 w-full"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label
                            onClick={() => setShowPassword(!showPassword)}
                            className="cursor-pointer absolute top-1/2 -mt-2 right-2"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </label>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Sign Up
                        </button>
                        <Link to="/" className="text-blue-500 hover:underline">
                            Sign In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
