import { hashPassword } from '../lib/hashPassword';
import UserModel, { UserInterface } from "./user.schema";

export const userFindingService = async (email: string, password: string, role?: string): Promise<UserInterface | boolean> => {
    const user = await UserModel.findOne({ email })
    if (!user) {
        return !!user
    }
    if (user.password === (await hashPassword(password))) {
        return user
    }
    return user
}

export const userCreateServices = async (userName: string, email: string, nonHashpassword: string, role: string): Promise<UserInterface | boolean> => {
    const user = await userFindingService(email, nonHashpassword)
    if (user) {
        return !!user
    }
    const password = await hashPassword(nonHashpassword)
    const newUser = await UserModel.create({ userName, email, password, role })
    if (!newUser) {
        return !!newUser
    }
    return newUser
}