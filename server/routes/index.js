import express from 'express';
import expenseRouter from './expense/index.js';

const appRouter = express.Router();

appRouter.use('/expense', expenseRouter);

export default appRouter;