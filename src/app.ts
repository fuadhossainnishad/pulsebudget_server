import express from "express";
import cors from "cors";
import userRoutes from "./users/user.routes";

const app = express();
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: '*',
    allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use('/', userRoutes)

export default app;
