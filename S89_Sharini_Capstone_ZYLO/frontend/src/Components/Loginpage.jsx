import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import "../Styles/Loginpage.css"; // Import your CSS file

const LoginPage = () => {
    const [username, setUsername] = useState(''); // Changed from email to username
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:2309/api/auth/login', { username, password }); // Changed email to username
            setSuccess('Login successful!');
            alert('Login successful!'); // Alert for successful login
            console.log('Token:', response.data.token); // Handle the token (e.g., save it to localStorage)
        } catch (err) {
            console.error('Error during login:', err);
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
            alert('Login failed. Please check your credentials.'); // Alert for login failure
        }
    };

    return (
        <div className="login-page">
            
            <h1>Welcome Back</h1>
            <p>Login to a world of connections.</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label> {/* Changed label */}
                    <input
                        type="text" // Changed input type to text
                        id="username"
                        value={username} // Changed from email to username
                        onChange={(e) => setUsername(e.target.value)} // Changed from setEmail to setUsername
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
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default LoginPage;