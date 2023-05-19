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

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/plants/${id}`)
        .then((response) => response.json())
        .then((data) => setName(data.name));
    }
  }, [id]);

  const handleDelete = async () => {
    await fetch(`http://localhost:3000/plants/${id}`, {
      method: 'DELETE',
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
