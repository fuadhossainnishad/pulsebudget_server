import express from "express";
import cors from "cors";
import userRoutes from "./users/user.routes";

const app = express();
app.use(cors())

app.use('/', userRoutes)

export default app;
