import express from 'express';
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

export default app;
