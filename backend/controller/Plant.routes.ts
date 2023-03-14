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
plantRouter.get('/', async (req: Request, res: Response) => {
    try {
        const plants = await PlantService.getAllPlants();
        res.status(200).send(plants);
    } catch (error) {
        res.status(500).json({ error: 'error', errorMessage: error.message });
    }
});

export default plantRouter;
