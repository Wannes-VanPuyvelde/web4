import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { plantRouter } from './controller/Plant.routes';
import { lightRouter } from './controller/Light.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Back-end',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);

app.use(cors());
app.use(bodyParser.json());

app.use('/plants', plantRouter);
app.use('/lights', lightRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
