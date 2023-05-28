import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../app/layout';

interface Errors {
  name?: string;
  light_color?: string;
}

const AddLight = () => {
  const [name, setName] = useState('');
  const [light_on, setLightOn] = useState(false);
  const [light_color, setLightColor] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const router = useRouter();

  const validateForm = () => {
    const validationErrors: Errors = {};

    if (name.trim() === '') {
      validationErrors.name = 'Name is required';
    }

    if (light_color.trim() === '') {
      validationErrors.light_color = 'Light color is required';
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      await fetch('http://localhost:3000/lights/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, light_on, light_color }),
      });

      router.push('/lights');
    }
  };

  return (
    <Layout>
      <h1>Add Light</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <span className="required">*</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>
        <br />
        <label>
          Light On:
          <input
            type="checkbox"
            checked={light_on}
            onChange={(e) => setLightOn(e.target.checked)}
          />
        </label>
        <br />
        <label>
          Light Color:
          <span className="required">*</span>
          <input
            type="text"
            value={light_color}
            onChange={(e) => setLightColor(e.target.value)}
            required
          />
          {errors.light_color && <span className="error">{errors.light_color}</span>}
        </label>
        <br />
        <button type="submit">Add Light</button>
      </form>
    </Layout>
  );
};

export default AddLight;
