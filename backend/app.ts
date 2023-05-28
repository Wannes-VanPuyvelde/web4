import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { plantRouter } from './controller/Plant.routes';
import { lightRouter } from './controller/Light.routes';
import { userRouter } from './controller/User.routes';

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Back-end for PlantsPage',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/plants', plantRouter);
app.use('/lights', lightRouter);
app.use('/user', userRouter);

app.get('/status', (req, res) => {
  res.json({ message: 'Back-end is running...' });
});

app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Back-end is running on port ${port}.`);
});
