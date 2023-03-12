import express, { Request, Response } from 'express';
import PlantService from '../service/Plant.service';

const plantRouter = express.Router();

plantRouter.get('/', async (req, res) => {
    try {
        const plants = await PlantService.getAllPlants();
        res.status(200).send(plants);
    } catch (error) {
        res.status(500).json({ error: 'error', errorMessage: error.message });
    }
});
