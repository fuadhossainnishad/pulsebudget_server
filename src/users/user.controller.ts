import { Request, Response } from 'express';
import { userCreateServices, userFindingService } from './user.service';
export const userFindingController = async (req: Request, res: Response) => {
    try {
        const { email, password, role } = req.body;
        const user = await userFindingService(email, password, role);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const userCreateController = async (req: Request, res: Response) => {
    try {
        const { userName, email, password, role } = req.body;
        const user = await userCreateServices(userName, email, password, role);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}