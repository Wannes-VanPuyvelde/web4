import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DeletePlant = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/plants/${id}`)
      .then((response) => response.json())
      .then((data) => setName(data.name));
  }, [id]);

  const handleDelete = () => {
    fetch(`http://localhost:3000/plants/${id}`, {
      method: 'DELETE',
    }).then(() => {
      console.log('Plant deleted');
      navigate('/plants');
    });
  };

  return (
    <div>
      <h1>Delete Plant</h1>
      <p>
        Are you sure you want to delete the plant named&nbsp;
        {`"${name}"`} {/* Add backticks (`) around the quotation marks */}
      </p>
      <button onClick={handleDelete}>Yes, delete</button>
      <button onClick={() => navigate('/plants')}>No, go back</button>
    </div>
  );
};

export default DeletePlant;
