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
 *            time_on:
 *              type: number
 *              description: Time the light has to stay on.
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
 *                           time_On:
 *                                type: number
 *                                example: 5
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
 *                                   time_On:
 *                                       type: number
 *                                       example: 5
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
 *                   time_On:
 *                     type: number
 *                     example: 5
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
 * /lights/{id,name,time_on,light_color}:
 *   put:
 *      summary: Update a light
 *      responses:
 *          200:
 *            description: Updates a light. If the light does not exist, an error is returned.
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Light'
 *
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Light ID
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 *        - name: name
 *          in: path
 *          description: Light name
 *          required: true
 *          schema:
 *            type: string
 *        - name: time_on
 *          in: path
 *          description: Time the light has to stay on.
 *          required: true
 *          schema:
 *            type: int64
 *        - name: light_color
 *          in: Path
 *          description: The color of the light.
 *          required: true
 *          schema:
 *            type: string
 */

lightRouter.put('/update/:id/:name/:time_on/:light_color', (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const name = req.params.name;
        const time_on = parseInt(req.params.time_on);
        const light_color = req.params.light_color;
        const light = LightService.updateLight(id, name, time_on, light_color);
        res.status(200).send(light);
    } catch (error) {
        res.status(500).json({ error: 'error', errorMessage: error.message });
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
 *                      time_on:
 *                          type: number
 *                          example: 5
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
 *                 time_On:
 *                   type: number
 *                   example: 5
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
            time_on: lightInput.time_on,
            light_color: lightInput.light_color
        };
        const plantCreated = LightService.addLight(parseLight.name, parseLight.time_on, parseLight.light_color);
        plantCreated.then(function (result) {
            res.status(200).json(result);
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});


export { lightRouter };
