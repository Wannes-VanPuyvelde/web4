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

const EditPlant = () => {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [lights, setLights] = useState<Light[]>([]);
  const [allLights, setAllLights] = useState<Light[]>([]);
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
        .then((data) => {
          setName(data.name);
          setDescription(data.description);
          setLights(data.lights);
        });

        fetch(`http://localhost:3000/lights`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        })
        .then((response) => response.json())
        .then((data) => {
          setAllLights(data);
        });
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/plants/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name, description }),
    });

    router.push('/plants');
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
