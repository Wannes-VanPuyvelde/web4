import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../app/layout';

interface Plant {
  id: number;
  name: string;
  description: string;
}

interface Light {
  id: number;
  name: string;
  light_on: boolean;
  light_color: string;
  plants: Plant[];
}

const EditLight = () => {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState('');
  const [light_on, setLightOn] = useState(false);
  const [light_color, setLightColor] = useState('');
  const [plants, setPlants] = useState<Plant[]>([]);
  const [allPlants, setAllPlants] = useState<Plant[]>([]);
  const [errors, setErrors] = useState<Partial<Light>>({});
  const token = typeof window !== 'undefined' ? window.sessionStorage.getItem('jwtToken') : '';

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [token, router]);

  useEffect(() => {
    if (id) {
      const fetchLightData = async () => {
        try {
          const responseLight = await fetch(`http://localhost:3000/lights/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const responsePlants = await fetch(`http://localhost:3000/plants`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (!responseLight.ok || !responsePlants.ok) {
            throw new Error('Failed to fetch light or plant data');
          }
          const dataLight = await responseLight.json();
          const dataPlants = await responsePlants.json();
          setName(dataLight.name);
          setLightOn(dataLight.light_on);
          setLightColor(dataLight.light_color);
          setPlants(dataLight.plants);
          setAllPlants(dataPlants);
        } catch (error) {
          console.error(error);
        }
      };

      fetchLightData();
    }
  }, [id, token]);

  const validateForm = () => {
    const validationErrors: Partial<Light> = {};

    if (name.trim() === '') {
      validationErrors.name = 'Name is required';
    }

    if (light_color.trim() === '') {
      validationErrors.light_color = 'Light Color is required';
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const linkPlant = async (plantId: number) => {
    await fetch(`http://localhost:3000/lights/${id}/plants/${plantId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  };

  const unlinkPlant = async (plantId: number) => {
    await fetch(`http://localhost:3000/lights/${id}/plants/${plantId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      await fetch(`http://localhost:3000/lights/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, light_on, light_color }),
      });

      router.push('/lights');
    }
  };

  return (
    <Layout>
      <h1>Edit Light</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <input
            type="text"
            value={light_color}
            onChange={(e) => setLightColor(e.target.value)}
          />
        </label>
        <br />
        {plants.map((plant) => (
          <div key={plant.id}>
            <span>{plant.name}</span>
            <button onClick={() => unlinkPlant(plant.id)}>Unlink Plant</button>
          </div>
        ))}
        <label>
          Link a new Plant:
          <select onChange={(e) => linkPlant(Number(e.target.value))}>
            <option value="">Select a Plant</option>
            {allPlants
              .filter((plant) => !plants.some((p) => p.id === plant.id))
              .map((plant) => (
                <option key={plant.id} value={plant.id}>
                  {plant.name}
                </option>
              ))}
          </select>
        </label>
        <br />
        <button type="submit">Update Light</button>
      </form>
    </Layout>
  );
};

export default EditLight;

