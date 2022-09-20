/* eslint-disable no-undef */
import express, { Response } from 'express';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import database from './config/db';
import restRouter from './router';
import { HttpMessageCode } from './constants';

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
        // components: {
        //   securitySchemes: {
        //     bearerAuth: {
        //       type: "http",
        //       scheme: "bearer",
        //       bearerFormat: "JWT",
        //     },
        //   },
        // },
        // security: [
        //   {
        //     bearerAuth: [],
        //   },
        // ],
    },
    apis: [`${__dirname}/router/*.ts`],
};
console.log(`${__dirname}/router/*.ts`);
const specs = swaggerJSDoc(option);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// routes

app.use('/api/v1', restRouter);

app.get('/health', (_, res: Response, __) => res.status(200).json({
    status: true,
    message: 'Server is up ready to rock!',
}));

app.use('*', (_req, res) => res.status(400).json({
    status: HttpMessageCode.BAD_REQUEST,
    message: 'Url not match',
}));

export default app;
