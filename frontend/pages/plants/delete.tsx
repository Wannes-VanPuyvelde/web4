import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../app/layout';

interface Plant {
  id: number;
  name: string;
  description: string;
}

const DeletePlant = () => {
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
      fetch(`http://localhost:3000/plants/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
        .then((response) => response.json())
        .then((data) => setName(data.name));
    }
  }, [id]);

  const handleDelete = async () => {
    await fetch(`http://localhost:3000/plants/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    router.push('/plants');
  };

  return (
    <Layout>
      <h1>Delete Plant</h1>
      <p>
        Are you sure you want to delete the plant named&nbsp;
        {`"${name}"`} {/* Add backticks (`) around the quotation marks */}
      </p>
      <button onClick={handleDelete}>Yes, delete</button>
      <button onClick={() => router.push('/plants')}>No, go back</button>
    </Layout>
  );
};

export default DeletePlant;
