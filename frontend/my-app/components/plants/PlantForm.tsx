import React, { useState } from 'react';
import { Plant } from '../../types/Plant';

interface PlantFormProps {
  onSubmit: (plant: Plant) => void;
  plant?: Plant;
}

const PlantForm: React.FC<PlantFormProps> = ({ onSubmit, plant }) => {
  const [name, setName] = useState(plant?.name || '');
  const [description, setDescription] = useState(plant?.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id: plant?.id || 0, name, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PlantForm;
