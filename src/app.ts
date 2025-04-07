import express from "express";
import cors from "cors";
import userRoutes from "./users/user.routes";
import budgetRoute from "./budget/budget.routes";
import { envConfig } from "./config/env.config";
import transactionRoute from "./transaction/transaction.routes";
const app = express();
app.use(express.json())
const url: string = envConfig.url
console.log(url);

app.use(cors({
    origin: url,
    credentials: true,
    methods: '*',
    allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use('/', userRoutes)
app.use('/', budgetRoute)
app.use('/', transactionRoute)

export default app;
