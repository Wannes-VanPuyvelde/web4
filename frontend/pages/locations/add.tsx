import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../app/layout';

interface Errors {
  name?: string;
  street?: string;
  number?: string;
  town?: string;
}

const AddLocation = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [town, setTown] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const router = useRouter();

  const validateForm = () => {
    const validationErrors: Errors = {};

    if (name.trim() === '') {
      validationErrors.name = 'Please enter a name';
    }

    if (street.trim() === '') {
      validationErrors.street = 'Please enter a street';
    }

    if (number.trim() === '' || parseInt(number) <= 0) {
      validationErrors.number = 'Please enter a valid number';
    }

    if (town.trim() === '') {
      validationErrors.town = 'Please enter a town';
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const numberValue = parseInt(number);
      await fetch('http://localhost:3000/locations/add', {
        method: 'POST',
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
      <h1>Add Location</h1>
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
        <br />
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
        <button type="submit">Add Location</button>

      </form>
    </Layout>
  );
};

export default AddLocation;
