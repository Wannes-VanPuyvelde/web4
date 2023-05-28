import React from 'react';
import Link from 'next/link';
import Layout from '../app/layout';
import useUser from '../hooks/useUser';

const WelcomePage = () => {
  const { user } = useUser();

  const logout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem('jwtToken');
      window.location.reload();
    }
  };

  return (
    <Layout>
      <h1>Welcome to the Plant Manager</h1>
      {!user ? (
        <>
          <Link href="/user/login">Login</Link>
          <br />
          <Link href="/user/register">Register</Link>
        </>
      ) : (
        <>
          <p>Welcome, {user.username}!</p>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </Layout>
  );
};

export default WelcomePage;
