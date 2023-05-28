import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../app/layout';

interface Location {
  id: number;
  name: string;
  description: string;
  street: string;
  number: number;
  town: string;
}

const DeleteLocation = () => {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const token = typeof window !== 'undefined' ? window.sessionStorage.getItem('jwtToken') : '';

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [token, router]);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/locations/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
        .then((response) => response.json())
        .then((data) => setName(data.name));
    }
  }, [id, token]);

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:3000/locations/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      router.push('/locations');
    } catch (error) {
      setError('Failed to delete the location');
    }
  };

  return (
    <Layout>
      <h1>Delete Location</h1>
      <p>
        Are you sure you want to delete the location named&nbsp;
        {`"${name}"`}
      </p>
      {error && <span className="error">{error}</span>}
      <button onClick={handleDelete}>Yes, delete</button>
      <button onClick={() => router.push('/locations')}>No, go back</button>
    </Layout>
  );
};

export default DeleteLocation;
