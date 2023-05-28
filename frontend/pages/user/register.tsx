import React, { useState } from 'react';
import Layout from '../../app/layout';
import { useRouter } from 'next/router';
import useUser from '../../hooks/useUser';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const { setUser } = useUser();
  const router = useRouter();

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (data.user) {
        sessionStorage.setItem('jwtToken', data.token);
        setUsername("");
        setEmail("");
        setPassword("");
        setError("");
        // setUser({ token: data.token, username: data.user.username });
        router.push('/login');
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Layout>
      <h1>Register</h1>
      <form onSubmit={register}>
        <div>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </Layout>
  );
};

export default Register;
