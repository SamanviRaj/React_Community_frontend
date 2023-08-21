import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import createApiClient from '../apiclient/apiClient';

const SignIn = ({ useMicroserviceA }) => {
    const [email, setEmail] = useState(''); // Change state variable to 'email'
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const baseUrl = useMicroserviceA ? 'http://localhost:9012' : 'http://localhost:9014';
    const apiClient = createApiClient(baseUrl);

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            const response = await apiClient.post('/api/v1/users/signin', {
                email, // Change from 'fullName' to 'email'
                password
            });

            console.log('Sign-in successful:', response.data);

            // Redirect to Invoice component using navigate
            navigate('/invoice');
        } catch (error) {
            console.error('Sign-in failed:', error);
            // Handle sign-in error here
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="m-auto w-2/5 p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold mb-6">Sign In</h2>
                <form onSubmit={handleSignIn}>
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
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-1 font-semibold">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="border p-2 w-full"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Sign In
                        </button>
                        <Link to="/signup" className="text-blue-500 hover:underline">
                            Sign Up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
