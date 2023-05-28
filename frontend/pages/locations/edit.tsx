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

const EditLocation = () => {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [town, setTown] = useState('');
  const [errors, setErrors] = useState<Partial<Location>>({});

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/locations/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setName(data.name);
          setDescription(data.description);
          setStreet(data.street);
          setNumber(data.number.toString()); // Convert the number to a string
          setTown(data.town);
        });
    }
  }, [id]);

  const validateForm = () => {
    const validationErrors: Partial<Location> = {};

    if (!name.trim()) {
      validationErrors.name = 'Name is required';
    }

    if (!street.trim()) {
      validationErrors.street = 'Street is required';
    }

    if (!town.trim()) {
      validationErrors.town = 'Town is required';
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numberValue = parseInt(number); // Parse the number value as an integer

    if (validateForm()) {
      await fetch(`http://localhost:3000/locations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, street, number: numberValue, town }),
      });

      router.push('/locations');
    }
  };

  return (
    <Layout>
      <h1>Edit Location</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <span className="required">*</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Street:
          <span className="required">*</span>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          {errors.street && <span className="error">{errors.street}</span>}
        </label>
        <br />
        <label>
          Number:
          <span className="required">*</span>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          {errors.number && <span className="error">{errors.number}</span>}
        </label>
        <br />
        <label>
          Town:
          <span className="required">*</span>
          <input
            type="text"
            value={town}
            onChange={(e) => setTown(e.target.value)}
          />
          {errors.town && <span className="error">{errors.town}</span>}
        </label>
        <br />
        <button type="submit">Update Location</button>
      </form>
    </Layout>
  );
};

export default EditLocation;
