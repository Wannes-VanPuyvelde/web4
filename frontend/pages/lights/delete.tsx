import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../app/layout';

interface Light {
  id: number;
  name: string;
  time_on: number;
  light_color: string;
}

const DeleteLight = () => {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/lights/${id}`)
        .then((response) => response.json())
        .then((data) => setName(data.name));
    }
  }, [id]);

  const handleDelete = async () => {
    await fetch(`http://localhost:3000/lights/${id}`, {
      method: 'DELETE',
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
