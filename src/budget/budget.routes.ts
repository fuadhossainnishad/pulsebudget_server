import express from 'express';
import { budgetDataController, fieldsFindController, filteredBudgetDataController } from './budget.controller';
const budgetRoute = express.Router()

budgetRoute.get('/dashboard', budgetDataController)
budgetRoute.get('/filter', filteredBudgetDataController)
budgetRoute.get('/fields', fieldsFindController)

export default budgetRoute