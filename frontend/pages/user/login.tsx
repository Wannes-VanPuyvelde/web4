import React, { useState } from 'react';
import Layout from '../../app/layout';
import { useRouter } from 'next/router'; // Import the useRouter hook

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  
  const router = useRouter(); // Initialize the useRouter hook

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.user && data.token) {
        sessionStorage.setItem('jwtToken', data.token);
        sessionStorage.setItem('username', data.user.username);  
        setUsername("");
        setPassword("");
        setError("");
        router.push('/');
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Layout>
      <h1>Login</h1>
      <form onSubmit={login}>
        <div>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </Layout>
  );
};

export default Login;
