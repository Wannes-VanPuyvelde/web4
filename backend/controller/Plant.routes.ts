/**
 * @swagger
 *   components:
 *    schemas:
 *      Plant:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Plant name.
 *            description:
 *              type: string
 *              description: Plant description.
 *
 */
import express, { Request, Response } from 'express';
import PlantService from '../service/Plant.service';
import { PlantInput } from '../types/PlantInput';

const plantRouter = express.Router();

/**
 * @swagger
 * /plants/{id}:
 *   get:
 *      summary: Get a plant by ID
 *      responses:
 *          200:
 *            description: Returns a plant. If the plant does not exist, an error is returned.
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Plant'
 *
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Plant ID
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 */
plantRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const plants = await PlantService.getPlantById(id);
        res.status(200).send(plants);
    } catch (error) {
        res.status(500).json({ error: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /plants/{id}:
 *   delete:
 *      summary: Delete a plant by ID
 *      responses:
 *          200:
 *            description: Deletes a plant. If the plant does not exist, an error is returned.
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Plant'
 *
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Plant ID
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 */
plantRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const plants = await PlantService.deletePlant(id);
        res.status(200).send(plants);
    } catch (error) {
        res.status(500).json({ error: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /plants:
 *   get:
 *      summary: Get all plants
 *      responses:
 *          200:
 *            description: Get all plants. If there are no plants, an error is returned.
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Plant'
 */
plantRouter.get('/', async (req: Request, res: Response) => {
    try {
        const plants = await PlantService.getAllPlants();
        res.status(200).send(plants);
    } catch (error) {
        res.status(500).json({ error: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /plants/{id,name,description}:
 *   put:
 *      summary: Update a plant
 *      responses:
 *          200:
 *            description: Updates a plant. If the plant does not exist, an error is returned.
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Plant'
 *
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Plant ID
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 *        - name: name
 *          in: path
 *          description: Plant name
 *          required: true
 *          schema:
 *            type: string
 *        - name: description
 *          in: path
 *          description: Plant description
 *          required: true
 *          schema:
 *            type: string
 */

plantRouter.put('/update/:id/:name/:description', (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const name = req.params.name;
        const description = req.params.description;
        const plant = PlantService.updatePlant(id, name, description);
        res.status(200).send(plant);
    } catch (error) {
        res.status(500).json({ error: 'error', errorMessage: error.message });
    }
});

export { plantRouter };
