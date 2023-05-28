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
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/lights/${id}`)
        .then((response) => response.json())
        .then((data) => setName(data.name));
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:3000/lights/${id}`, {
        method: 'DELETE',
      });

      router.push('/lights');
    } catch (error) {
      setError('Failed to delete the light');
    }
  };

  return (
    <Layout>
      <h1>Delete Light</h1>
      <p>
        Are you sure you want to delete the light named&nbsp;
        {`"${name}"`}
      </p>
      {error && <span className="error">{error}</span>}
      <button onClick={handleDelete}>Yes, delete</button>
      <button onClick={() => router.push('/lights')}>No, go back</button>
    </Layout>
  );
};

export default DeleteLight;
