import express, { Response } from 'express';
import cors from 'cors';
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
