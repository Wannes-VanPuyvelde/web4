import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../app/layout';

interface Light {
  id: number;
  name: string;
  light_on: boolean;
  light_color: string;
}

const DeleteLight = () => {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState('');
  const token = typeof window !== 'undefined' ? window.sessionStorage.getItem('jwtToken') : '';

  useEffect(() => {
    if (!token) {
      router.push('/'); 
    }
  }, [token, router]);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/lights/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setName(data.name));
    }
  }, [id]);

  const handleDelete = async () => {
    await fetch(`http://localhost:3000/lights/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    router.push('/lights');
  };

  return (
    <Layout>
      <h1>Delete Light</h1>
      <p>
        Are you sure you want to delete the light named&nbsp;
        {`"${name}"`}
      </p>
      <button onClick={handleDelete}>Yes, delete</button>
      <button onClick={() => router.push('/lights')}>No, go back</button>
    </Layout>
  );
};

export default DeleteLight;
