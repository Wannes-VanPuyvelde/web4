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
 *     summary: Get all plants
 *     responses:
 *         200:
 *           description: Get all plants. If there are no plants, an error is returned.
 *           content:
 *              application/json:
 *                  schema:
 *                     type: object
 *                     properties:
 *                         "id":
 *                             type: number
 *                         "name":
 *                             type: string
 *                         "description":
 *                             type: string
 *
 *     responses:
 *       200:
 *         description: Gets all plants.
 *       403:
 *         description: not allowed.
 *       500:
 *         description: An error has occurred, see error message for more details.
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
 * /plants:
 *   put:
 *     summary: Update a new plant
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      "id":
 *                          type: number
 *                      "name":
 *                          type: string
 *                      "description":
 *                          type: string
 *
 *     responses:
 *       200:
 *         description: Updates a new plant.
 *       403:
 *         description: not allowed.
 *       500:
 *         description: An error has occurred, see error message for more details.
 */

plantRouter.put('/', (req: Request, res: Response) => {
    try {
        const id = parseInt(req.body.id);
        const plantInput: PlantInput = req.body;
        const parsePlant: PlantInput = {
            id: plantInput.id,
            name: plantInput.name,
            description: plantInput.description,
        };
        const plantUpdated = PlantService.updatePlant(id, parsePlant.name, parsePlant.description);
        plantUpdated.then(function (result) {
            res.status(200).json(result);
        });
    } catch (error) {
        res.status(500).json({ error: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /plants/add:
 *   post:
 *     summary: Add a new plant
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      "name":
 *                          type: string
 *                      "description":
 *                          type: string
 *
 *     responses:
 *       200:
 *         description: Add a new plant.
 *       403:
 *         description: not allowed.
 *       500:
 *         description: An error has occurred, see error message for more details.
 */

plantRouter.post('/add', (req: Request, res: Response) => {
    try {
        const plantInput: PlantInput = req.body;
        const parsePlant: PlantInput = {
            id: plantInput.id,
            name: plantInput.name,
            description: plantInput.description,
        };
        const plantCreated = PlantService.addPlant(parsePlant.name, parsePlant.description);
        plantCreated.then(function (result) {
            res.status(200).json(result);
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

export { plantRouter };
