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
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Plant ID
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *          200:
 *            description: Returns a plant. If the plant does not exist, an error is returned.
 *            content:
 *               application/json:
 *                   schema:
 *                       type: object
 *                       properties:
 *                           id:
 *                               type: integer
 *                               example: 1
 *                           name:
 *                               type: string
 *                               example: Rose
 *                           description:
 *                               type: string
 *                               example: A beautiful flower
 *                           createdAt:
 *                               type: string
 *                               format: date-time
 *                               example: '2023-04-13T10:00:00.000Z'
 *          404:
 *            description: Plant not found.
 *          500:
 *            description: An error has occurred, see error message for more details.
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
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Plant ID
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *          200:
 *            description: Deletes a plant. If the plant does not exist, an error is returned.
 *            content:
 *               application/json:
 *                   schema:
 *                       type: object
 *                       properties:
 *                           message:
 *                               type: string
 *                               example: Plant deleted successfully
 *                           data:
 *                               type: object
 *                               properties:
 *                                   id:
 *                                       type: integer
 *                                       example: 1
 *                                   name:
 *                                       type: string
 *                                       example: Rose
 *                                   description:
 *                                       type: string
 *                                       example: A beautiful flower
 *                                   deletedAt:
 *                                       type: string
 *                                       format: date-time
 *                                       example: '2023-04-13T10:00:00.000Z'
 *          404:
 *            description: Plant not found.
 *          500:
 *            description: An error has occurred, see error message for more details.
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
 *       200:
 *         description: Returns all plants.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Rose"
 *                   description:
 *                     type: string
 *                     example: "A beautiful flower"
 *       403:
 *         description: Not allowed.
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

/**
 * @swagger
 * /plants/add:
 *   post:
 *     summary: Add a new plant
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                          example: "Rose"
 *                      description:
 *                          type: string
 *                          example: "A flowering woody plant"
 *
 *     responses:
 *       200:
 *         description: Plant successfully added.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Rose"
 *                 description:
 *                   type: string
 *                   example: "A flowering woody plant"
 *       403:
 *         description: Not allowed.
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
