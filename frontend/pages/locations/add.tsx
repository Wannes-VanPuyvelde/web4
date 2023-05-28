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

const AddLocation = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [town, setTown] = useState('');
  const [errors, setErrors] = useState<Partial<Location>>({});

  const router = useRouter();
  const token = typeof window !== 'undefined' ? window.sessionStorage.getItem('jwtToken') : '';

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [token, router]);


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
      await fetch('http://localhost:3000/locations/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description, street, number: numberValue, town }),
      });

      router.push('/locations');
    }
  };

  return (
    <Layout>
      <h1>Add Location</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
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
        <br />
        <label>
          Street:
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
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          {errors.number && <span className="error">{errors.number}</span>}
        </label>
        <br />
        <label>
          Town:
          <input
            type="text"
            value={town}
            onChange={(e) => setTown(e.target.value)}
          />
          {errors.town && <span className="error">{errors.town}</span>}
        </label>
        <br />
        <button type="submit">Add Location</button>
      </form>
    </Layout>
  );
};

export default AddLocation;
