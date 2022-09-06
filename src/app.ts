import express, { Response } from 'express';
import cors from 'cors';
import database from './config/db';
import restRouter from './router';

require('dotenv').config();

const app = express();

// database........
database();

// middleware--------------
app.use(express.json());
app.use(express());
app.use(cors());

// routes
app.use('/api/v1', restRouter);

app.get('/health', (_, res: Response, __) => res.status(200).json({
    status: true,
    message: 'Server is up ready to rock!',
}));

export default app;
