import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../app/layout';

interface Plant {
  id: number;
  name: string;
  description: string;
}

interface Location {
  id: number;
  name: string;
  description: string;
  street: string;
  number: number;
  town: string;
  plants: Plant[];
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
  const [plants, setPlants] = useState<Plant[]>([]);
  const [allPlants, setAllPlants] = useState<Plant[]>([]);
  const token = typeof window !== 'undefined' ? window.sessionStorage.getItem('jwtToken') : '';

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [token, router]);

  useEffect(() => {
    if (id) {
      const fetchLocationData = async () => {
        try {
          const responseLocation = await fetch(`http://localhost:3000/locations/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const responsePlants = await fetch(`http://localhost:3000/plants`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (!responseLocation.ok || !responsePlants.ok) {
            throw new Error('Failed to fetch location or plant data');
          }
          const dataLocation = await responseLocation.json();
          const dataPlants = await responsePlants.json();
          setName(dataLocation.name);
          setDescription(dataLocation.description);
          setStreet(dataLocation.street);
          setNumber(dataLocation.number.toString());
          setTown(dataLocation.town);
          setPlants(dataLocation.plants);
          setAllPlants(dataPlants);
        } catch (error) {
          console.error(error);
        }
      };

      fetchLocationData();
    }
  }, [id, token]);

  const validateForm = () => {
    const validationErrors: Partial<Location> = {};

    if (name.trim() === '') {
      validationErrors.name = 'Name is required';
    }

    if (street.trim() === '') {
      validationErrors.street = 'Street is required';
    }

    if (town.trim() === '') {
      validationErrors.town = 'Town is required';
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const linkPlant = async (plantId: number) => {
    await fetch(`http://localhost:3000/locations/${id}/plants/${plantId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  };

  const unlinkPlant = async (plantId: number) => {
    await fetch(`http://localhost:3000/locations/${id}/plants/${plantId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numberValue = parseInt(number);
    if (validateForm()) {
      await fetch(`http://localhost:3000/locations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description, street, number: numberValue, town, plants }),
      });
    
      router.push('/locations');
    } };

    return (
    <Layout>
    <h1>Edit Location</h1>
    <form onSubmit={handleSubmit}>
    <label>
    Name:
    <span className="required"></span>
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
    <span className="required"></span>
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
    <span className="required"></span>
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
    <span className="required"></span>
    <input
    type="text"
    value={town}
    onChange={(e) => setTown(e.target.value)}
    />
    {errors.town && <span className="error">{errors.town}</span>}
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
    <button type="submit">Update Location</button>
    </form>
    </Layout>
    );
    };
    
    export default EditLocation;