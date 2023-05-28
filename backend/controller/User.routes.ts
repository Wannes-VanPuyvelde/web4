import express, { Request, Response } from 'express';
import UserService from '../service/User.service';

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    try {
      const user = await UserService.register(req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
userRouter.post("/login", async (req, res) => {
    try {
      const result = await UserService.login(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });