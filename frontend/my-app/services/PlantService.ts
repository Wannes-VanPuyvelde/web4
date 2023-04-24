import axios from 'axios';
import { Plant } from '../types/Plant';

const API_URL = '/api/plants';

export const getAllPlants = async (): Promise<Plant[]> => {
const response = await axios.get<Plant[]>(API_URL);
return response.data;
};

export const getPlantById = async (id: number): Promise<Plant> => {
    const response = await axios.get<Plant>(`${API_URL}/${id}`);
    return response.data;
  };
  

export const addPlant = async (plant: Plant): Promise<Plant> => {
const response = await axios.post<Plant>(API_URL, plant);
return response.data;
};

export const updatePlant = async (plant: Plant): Promise<Plant> => {
const response = await axios.put<Plant>(`${API_URL}/${plant.id}`, plant);
return response.data;
};

export const deletePlant = async (id: number): Promise<void> => {
await axios.delete(`${API_URL}/${id}`);
};

const plantService = {
getAllPlants,
getPlantById,
addPlant,
updatePlant,
deletePlant,
};

export default plantService;