import express from 'express';
import { userFindingController } from './user.controller';
const userRoutes=express.Router()

userRoutes.post('/login',userFindingController)

export default userRoutes;