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
import express from 'express';
import { Request, Response } from 'express';
import PlantService from '../service/Plant.service';
import { PlantInput, PlantBasicInput } from '../types/PlantInput';
import jwtMiddleware from './authMiddleware';

const plantRouter = express.Router();

/**
 * @swagger
 * /plants/{id}:
 *   get:
 *     summary: Get a plant by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Plant ID
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Returns a plant. If the plant does not exist, an error is returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Rose
 *                 description:
 *                   type: string
 *                   example: A beautiful flower
 *       404:
 *         description: Plant not found.
 *       500:
 *         description: An error has occurred, see error message for more details.
 */
plantRouter.get('/:id', jwtMiddleware, async (req: Request, res: Response) => {
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
 *      security:
 *       - bearerAuth: []
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
 *          404:
 *            description: Plant not found.
 *          500:
 *            description: An error has occurred, see error message for more details.
 */
plantRouter.delete('/:id', jwtMiddleware, async (req: Request, res: Response) => {
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
 *     security:
 *       - bearerAuth: []
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

plantRouter.get('/', jwtMiddleware, async (req: Request, res: Response) => {
    try {
        const plants = await PlantService.getAllPlants();
        res.status(200).send(plants);
    } catch (error) {
        res.status(500).json({ error: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /plants/{id}:
 *   put:
 *     summary: Update a plant
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the plant to update
 *         schema:
 *           type: integer
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
 *     responses:
 *       200:
 *         description: Plant successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plant'
 *       403:
 *         description: Not allowed.
 *       500:
 *         description: An error has occurred, see error message for more details.
 */

plantRouter.put('/:id', jwtMiddleware, (req: Request, res: Response) => {
    try {
        const plantId: number = Number(req.params.id);
        const plantInput: PlantInput = req.body;

        const updatedPlant = PlantService.updatePlant(plantId, plantInput.name, plantInput.description);
        updatedPlant.then(function (result) {
            res.status(200).json(result);
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});



/**
 * @swagger
 * /plants/add:
 *   post:
 *     summary: Add a new plant
 *     security:
 *       - bearerAuth: [] 
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

plantRouter.post('/add', jwtMiddleware, (req: Request, res: Response) => {
    try {
        const plantInput: PlantBasicInput = req.body;
        const parsePlant: PlantBasicInput = {
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

/**
 * @swagger
 * /plants/{plantId}/lights/{lightId}:
 *   post:
 *     summary: Link a light to a plant
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: plantId
 *         required: true
 *         description: ID of the plant
 *         schema:
 *           type: integer
 *       - in: path
 *         name: lightId
 *         required: true
 *         description: ID of the light
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Light successfully linked to plant.
 *       500:
 *         description: An error has occurred, see error message for more details.
 */

plantRouter.post('/:plantId/lights/:lightId', jwtMiddleware, async (req: Request, res: Response) => {
    try {
        const plantId = parseInt(req.params.plantId);
        const lightId = parseInt(req.params.lightId);
        const plant = await PlantService.linkLightToPlant({ plantId, lightId });
        res.status(200).send(plant);
    } catch (error) {
        res.status(500).json({ error: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /plants/{plantId}/lights/{lightId}:
 *   delete:
 *     summary: Unlink a light from a plant
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: plantId
 *         required: true
 *         description: ID of the plant
 *         schema:
 *           type: integer
 *       - in: path
 *         name: lightId
 *         required: true
 *         description: ID of the light
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Light successfully unlinked from plant.
 *       500:
 *         description: An error has occurred, see error message for more details.
 */

plantRouter.delete('/:plantId/lights/:lightId', jwtMiddleware, async (req: Request, res: Response) => {
    try {
        const plantId = parseInt(req.params.plantId);
        const lightId = parseInt(req.params.lightId);
        const plant = await PlantService.unlinkLightFromPlant({ plantId, lightId });
        res.status(200).send(plant);
    } catch (error) {
        res.status(500).json({ error: 'error', errorMessage: error.message });
    }
});

export { plantRouter };
