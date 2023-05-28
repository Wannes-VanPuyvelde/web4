/**
 * @swagger
 *   components:
 *    schemas:
 *      Location:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Location name.
 *            description:
 *              type: string
 *              description: Location description.
 *            street:
 *              type: string
 *              description: Street name.
 *            number:
 *              type: number
 *              format: int32
 *              description: Street number.
 *            town:
 *              type: string
 *              description: Town name.
 *
 */
import express, { Request, Response } from 'express';
import LocationService from '../service/Location.service';
import { LocationInput } from '../types/LocationInput';
import jwtMiddleware from './authMiddleware';

const locationRouter = express.Router();
locationRouter.use(jwtMiddleware);

/**
 * @swagger
 * /locations/{id}:
 *   get:
 *      summary: Get a location by ID
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Location ID
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *          200:
 *            description: Returns a location. If the location does not exist, an error is returned.
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
 *                               example: Home
 *                           description:
 *                               type: string
 *                               example: A beautifull location
 *                           street:
 *                               type: string
 *                               example: Pilsstraat
 *                           number:
 *                               type: integer
 *                               example: 5
 *                               format: int64
 *                           town:
 *                               type: string
 *                               example: Antwerp
 *          404:
 *            description: Location not found.
 *          500:
 *            description: An error has occurred, see error message for more details.
 */
locationRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const location = await LocationService.getLocationById(id);
        res.status(200).send(location);
    } catch (error) {
        res.status(500).json({ error: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /locations/{id}:
 *   delete:
 *      summary: Delete a location by ID
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Location ID
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *          200:
 *            description: Deletes a location. If the location does not exist, an error is returned.
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Location'
 *          404:
 *            description: Location not found.
 *          500:
 *            description: An error has occurred, see error message for more details.
 */
locationRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const location = await LocationService.deleteLocation(id);
        res.status(200).send(location);
    } catch (error) {
        res.status(500).json({ error: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /locations:
 *   get:
 *     summary: Get all locations
 *     responses:
 *       200:
 *         description: Returns all locations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 *       403:
 *         description: Not allowed.
 *       500:
 *         description: An error has occurred, see error message for more details.
 */
locationRouter.get('/', async (req: Request, res: Response) => {
    try {
        const locations = await LocationService.getAllLocations();
        res.status(200).send(locations);
    } catch (error) {
        res.status(500).json({ error: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /locations/{id}:
 *   put:
 *     summary: Update a location
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the location to update
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
 *                          example: "Home"
 *                      description:
 *                          type: string
 *                          example: "Mooi huisje"
 *                      street:
 *                          type: string
 *                          example: "Pilsstraat"
 *                      number:
 *                          type: number
 *                          example: 5
 *                      town:
 *                          type: string
 *                          example: "Antwerp"
 *     responses:
 *       200:
 *         description: Location successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       403:
 *         description: Not allowed.
 *       500:
 *         description: An error has occurred, see error message for more details.
 */
locationRouter.put('/:id', (req: Request, res: Response) => {
    try {
        const locationId: number = Number(req.params.id);
        const locationInput: LocationInput = req.body;

        const updatedLocation = LocationService.updateLocation(locationId, locationInput.name, locationInput.description, locationInput.street, locationInput.number, locationInput.town);
        updatedLocation.then(function (result) {
            res.status(200).json(result);
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

/**
 * @swagger
 * /locations/add:
 *   post:
 *     summary: Add a new Location
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                          example: "Home"
 *                      description:
 *                          type: string
 *                          example: "Home in antwerp"
 *                      street:
 *                          type: string
 *                          example: "pilsstraat"
 *                      number:
 *                          type: number
 *                          example: 5
 *                      town:
 *                          type: string
 *                          example: "Antwerp"
 *
 *     responses:
 *       200:
 *         description: Location successfully added.
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
 *                   example: "Home"
 *                 description:
 *                   type: string
 *                   example: "Home in Antwerp"
 *                 street:
 *                   type: string
 *                   example: "A flowering woody plant"
 *                 number:
 *                   type: number
 *                   example: 5
 *                 town:
 *                   type: string
 *                   example: "Antwerp"
 *       403:
 *         description: Not allowed.
 *       500:
 *         description: An error has occurred, see error message for more details.
 */

locationRouter.post('/add', (req: Request, res: Response) => {
    try {
        const locationInput: LocationInput = req.body;
        const parseLocation: LocationInput = {
            id: locationInput.id,
            name: locationInput.name,
            description: locationInput.description,
            street: locationInput.street,
            number: locationInput.number,
            town: locationInput.town,
        };
        const location = LocationService.addLocation(parseLocation.name, parseLocation.description, parseLocation.street, parseLocation.number, parseLocation.town);
        res.status(200).send(location)
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});


export { locationRouter };
