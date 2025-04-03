import { hashPassword } from "../lib/hashPassword";
import UserModel, { UserInterface } from "./user.schema";

export const userFindingService = async (email: string, password: string, role: string): Promise<UserInterface | boolean> => {
    const user = await UserModel.findOne({ email, role })
    if (!user) {
        return !!user
    }
    if (user.password === (await hashPassword(password))) {
        return user
    }
    return !!user
}