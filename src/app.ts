import express, { Response } from 'express';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import database from './config/db';
import restRouter from './router';
import { HttpMessage, HttpMessageCode } from './constants';

const {
    Routes: { HOME },
} = require('./constants');

require('dotenv').config();

const app = express();

// database........
database();

// middleware--------------
app.use(express.json());
app.use(express());

const options = {
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: '*',
};
app.use(cors(options));

const option = {
    swaggerDefinition: {
        openapi: '3.0.1', // YOU NEED THIS
        info: {
            title: 'Node Js  Api',
            version: '1.0.0',
            description: 'a simple curd api',
        },
        servers: [
            {
                url: 'http://localhost:8001',
            },
        ],
        basePath: '/',
    },
    apis: [`${__dirname}/router/*.ts`],
};
const specs = swaggerJSDoc(option);

app.use(HOME.SWAGGER, swaggerUi.serve, swaggerUi.setup(specs));

// routes

app.use(HOME.API_ENDPOINT, restRouter);

app.get(HOME.HEALTH, (_, res: Response, __) => res.status(HttpMessageCode.CREATED).json({
    status: true,
    message: HttpMessage.SERVER_START,
}));

app.use(HOME.NOT_MATCH_ROUTE, (_req, res) => res.status(HttpMessageCode.BAD_REQUEST).json({
    status: HttpMessageCode.BAD_REQUEST,
    message: HttpMessage.NOT_MATCH,
}));

export default app;
