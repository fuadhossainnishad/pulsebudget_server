import express from 'express';
import { budgetDataController, filteredBudgetDataController } from './budget.controller';
const budgetRoute = express.Router()

budgetRoute.get('/dashboard', budgetDataController)
budgetRoute.get('/filter', filteredBudgetDataController)

export default budgetRoute