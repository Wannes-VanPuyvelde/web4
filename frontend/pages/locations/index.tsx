import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../app/layout';
import { useRouter } from 'next/router';

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

const Locations = () => {
  const router = useRouter();
  const [locations, setLocations] = useState<Location[]>([]);
  const token = typeof window !== 'undefined' ? window.sessionStorage.getItem('jwtToken') : '';

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [token, router]);

  useEffect(() => {
    fetch('http://localhost:3000/locations', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Sort the locations by id
        const sortedData = data.sort((a: Location, b: Location) => a.id - b.id);
        setLocations(sortedData);
      });
  }, [token]);

  return (
    <Layout>
      <h1>Locations</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Street</th>
            <th>Number</th>
            <th>Town</th>
            <th>Plants</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location.id}>
              <td>{location.id}</td>
              <td>{location.name}</td>
              <td>{location.description}</td>
              <td>{location.street}</td>
              <td>{location.number}</td>
              <td>{location.town}</td>
              <td>
                <ul>
                  {location.plants.map((plant) => (
                    <li key={plant.id}>
                      {plant.name}: {plant.description}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <Link href={`/locations/edit?id=${location.id}`} as={`/locations/edit/${location.id}`}>
                  Edit
                </Link>
              </td>
              <td>
                <Link href={`/locations/delete?id=${location.id}`} as={`/locations/delete/${location.id}`}>
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Locations;
