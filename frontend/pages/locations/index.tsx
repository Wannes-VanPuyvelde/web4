import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../app/layout';

interface Location {
  id: number;
  name: string;
  description: string;
  street: string;
  number: number;
  town: string;
}

const Locations = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/locations')
      .then((response) => response.json())
      .then((data) => {
        // Sort the locations by id
        const sortedData = data.sort((a: Location, b: Location) => a.id - b.id);
        setLocations(sortedData);
      });
    }, []);

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
