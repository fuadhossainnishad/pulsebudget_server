import express from 'express';
import { userCreateController, userFindingController } from './user.controller';
const userRoutes = express.Router()

userRoutes.post('/create', userCreateController)
userRoutes.post('/login', userFindingController)


export default userRoutes;