import express from "express";
import {
    createExpense,
    deleteExpense,
    editExpense,
    listExpenses
} from "../../api/controllers/expense/expense-controller.js";

const expenseRouter = express.Router();

expenseRouter.get('/', listExpenses);
expenseRouter.post('/', createExpense);
expenseRouter.patch('/:id', editExpense);
expenseRouter.delete('/:id', deleteExpense);

export default expenseRouter;