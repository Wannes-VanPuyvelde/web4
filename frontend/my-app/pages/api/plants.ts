import { NextApiRequest, NextApiResponse } from 'next';
import plantService from '../../services/PlantService';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const plants = await plantService.getAllPlants();
        res.status(200).json(plants);
      } catch (error: unknown) {
        res.status(500).json({ message: (error as Error).message });
      }
      break;
    case 'POST':
      try {
        const plant = await plantService.addPlant(req.body);
        res.status(201).json(plant);
      } catch (error: unknown) {
        res.status(500).json({ message: (error as Error).message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
