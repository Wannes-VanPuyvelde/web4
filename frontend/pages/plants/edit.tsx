import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../app/layout';

interface Light {
  id: number;
  name: string;
  light_on: boolean;
  light_color: string;
}

interface Plant {
  id: number;
  name: string;
  description: string;
  lights: Light[];
}

interface Errors {
  name?: string;
}

const EditPlant = () => {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [lights, setLights] = useState<Light[]>([]);
  const [allLights, setAllLights] = useState<Light[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const token = typeof window !== 'undefined' ? window.sessionStorage.getItem('jwtToken') : '';

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [token, router]);

  useEffect(() => {
    if (id) {
      const fetchPlant = async () => {
        try {
          const response = await fetch(`http://localhost:3000/plants/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setName(data.name);
          setDescription(data.description);
          setLights(data.lights);
        } catch (error) {
          console.error('Error fetching plant:', error);
        }
      };

      const fetchLights = async () => {
        try {
          const response = await fetch(`http://localhost:3000/lights`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setAllLights(data);
        } catch (error) {
          console.error('Error fetching lights:', error);
        }
      };

      fetchPlant();
      fetchLights();
    }
  }, [id, token]);

  const linkLight = async (lightId: number) => {
    await fetch(`http://localhost:3000/plants/${id}/lights/${lightId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  };

  const unlinkLight = async (lightId: number) => {
    await fetch(`http://localhost:3000/plants/${id}/lights/${lightId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  };

  const validateForm = () => {
    const validationErrors: Errors = {};

    if (name.trim() === '') {
      validationErrors.name = 'Name is required';
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      await fetch(`http://localhost:3000/plants/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description }),
      });

      router.push('/plants');
    }
  };

  return (
    <Layout>
      <h1>Edit Plant</h1>
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
        {lights.map((light) => (
          <div key={light.id}>
            <span>{light.name}</span>
            <button onClick={() => unlinkLight(light.id)}>Unlink Light</button>
          </div>
        ))}
        <label>
          Link a new Light:
          <select onChange={(e) => linkLight(Number(e.target.value))}>
            <option value="">Select a Light</option>
            {allLights
              .filter((light) => !lights.some((l) => l.id === light.id))
              .map((light) => (
                <option key={light.id} value={light.id}>
                  {light.name}
                </option>
              ))}
          </select>
        </label>
        <br />
        <button type="submit">Update Plant</button>
      </form>
    </Layout>
  );
};

export default EditPlant;

