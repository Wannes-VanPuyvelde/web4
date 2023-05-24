/**
 * @swagger
 *   components:
 *    schemas:
 *      Light:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Plant name.
 *            light_on:
 *              type: boolean
 *              description: Status if the light is on or off.
 *            light_color:
 *              type: string
 *              description: The color of the light.
 *
 */

import express, { Request, Response } from 'express';
import LightService from '../service/Light.service';
import { LightInput } from '../types/LightInput';

const lightRouter = express.Router();
/**
 * @swagger
 * /lights/{id}:
 *   get:
 *      summary: Get a light by ID
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Light ID
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *          200:
 *            description: Returns a light. If the light does not exist, an error is returned.
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
 *                               example: LivingLamp
 *                           light_on:
 *                                type: boolean
 *                                example: false
 *                           light_color:
 *                                type: string
 *                                example: K1000
 *          404:
 *            description: Light not found.
 *          500:
 *            description: An error has occurred, see error message for more details.
 */
lightRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const light = await LightService.getLightById(id);
        res.status(200).send(light);
    } catch (error) {
        res.status(500).json({ error: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /Lights/{id}:
 *   delete:
 *      summary: Delete a light by ID
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Light ID
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *          200:
 *            description: Deletes a light. If the light does not exist, an error is returned.
 *            content:
 *               application/json:
 *                   schema:
 *                       type: object
 *                       properties:
 *                           message:
 *                               type: string
 *                               example: Light deleted successfully
 *                           data:
 *                               type: object
 *                               properties:
 *                                   id:
 *                                       type: integer
 *                                       example: 1
 *                                   name:
 *                                       type: string
 *                                       example: LivingLamp
 *                                   light_on:
 *                                       type: boolean
 *                                       example: false
 *                                   light_color:
 *                                       type: string
 *                                   example: K1000
 *          404:
 *            description: Plant not found.
 *          500:
 *            description: An error has occurred, see error message for more details.
 */
lightRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const light = await LightService.deleteLight(id);
        res.status(200).send(light);
    } catch (error) {
        res.status(500).json({ error: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /lights:
 *   get:
 *     summary: Get all lights
 *     responses:
 *       200:
 *         description: Returns all lights.
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
 *                     example: "LivingLamp"
 *                   light_on:
 *                     type: boolean
 *                     example: false
 *                   light_color:
 *                     type: string
 *                     example: K1000
 *       403:
 *         description: Not allowed.
 *       500:
 *         description: An error has occurred, see error message for more details.
 */

lightRouter.get('/', async (req: Request, res: Response) => {
    try {
        const lights = await LightService.getAllLights();
        res.status(200).send(lights);
    } catch (error) {
        res.status(500).json({ error: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /lights/{id}:
 *   put:
 *     summary: Update a light
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the light to update
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
 *                          example: "LivingLamp"
 *                      light_on:
 *                          type: boolean
 *                          example: false
 *                      light_color:
 *                          type: string
 *                          example: "K1000"
 *     responses:
 *       200:
 *         description: Light successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Light'
 *       403:
 *         description: Not allowed.
 *       500:
 *         description: An error has occurred, see error message for more details.
 */

lightRouter.put('/:id', (req: Request, res: Response) => {
    try {
        const lightId: number = Number(req.params.id);
        const lightInput: LightInput = req.body;

        const updatedLight = LightService.updateLight(lightId, lightInput.name, lightInput.light_on, lightInput.light_color);
        updatedLight.then(function (result) {
            res.status(200).json(result);
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});



/**
 * @swagger
 * /lights/add:
 *   post:
 *     summary: Add a new Light
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                          example: "LivingLamp"
 *                      light_on:
 *                          type: boolean
 *                          example: false
 *                      light_color:
 *                          type: string
 *                          example: K1000
 *
 *     responses:
 *       200:
 *         description: Light successfully added.
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
 *                   example: "LivingLamp"
 *                 light_on:
 *                   type: boolean
 *                   example: false
 *                 light_color:
 *                   type: string
 *                   example: K1000
 *       403:
 *         description: Not allowed.
 *       500:
 *         description: An error has occurred, see error message for more details.
 */

lightRouter.post('/add', (req: Request, res: Response) => {
    try {
        const lightInput: LightInput = req.body;
        const parseLight: LightInput = {
            id: lightInput.id,
            name: lightInput.name,
            light_on: lightInput.light_on,
            light_color: lightInput.light_color
        };
        const plantCreated = LightService.addLight(parseLight.name, parseLight.light_on, parseLight.light_color);
        plantCreated.then(function (result) {
            res.status(200).json(result);
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});


export { lightRouter };
