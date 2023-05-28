import express, { Request, Response } from 'express';
import UserService from '../service/User.service';
import jwtMiddleware from './authMiddleware';

const userRouter = express.Router();
userRouter.use(jwtMiddleware);

/**
 * @swagger
 * /user/register:
 *  post:
 *      summary: Register a new user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: The user has been successfully created.
 *          500:
 *              description: There was an error during the registration process.
 */
userRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const user = await UserService.register(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /user/login:
 *  post:
 *      summary: Login a user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: The user has been successfully logged in.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              user:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: integer
 *                                      username:
 *                                          type: string
 *                                      email:
 *                                          type: string
 *                              token:
 *                                  type: string
 *          500:
 *              description: There was an error during the login process.
 */
userRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const result = await UserService.login(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { userRouter };
