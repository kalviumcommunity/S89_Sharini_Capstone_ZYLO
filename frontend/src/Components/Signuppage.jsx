import React, { useState } from 'react';
import axios from 'axios'; 
import "../Styles/Signuppage.css"; // Import your CSS file

const SignupPage = () => {
    const [username, setUsername] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:2309/api/auth/signup', { username, email, password }); // Include email in the API call
            setSuccess('Signup successful!');
            alert('Signup successful!'); 
            console.log('Response:', response.data);
        } catch (err) {
            console.log('Error during signup:', err);
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
            alert('Signup failed. Please check your details.'); 
        }
    };

    return (
        <div className="login-page">
            <h1>Create an Account</h1>
            <p>Join us and explore endless possibilities.</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Signup</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default SignupPage;