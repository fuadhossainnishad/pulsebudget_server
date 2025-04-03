import mongoose, { Document, Model, Schema } from "mongoose";
import { hashPassword } from "../lib/hashPassword";

enum UserRole {
    VIEWER = 'viewer',
    ADMIN = 'admin'
}

export interface UserInterface extends Document {
    userName: string;
    email: string;
    password: string;
    role: UserRole
    createdAt?: Date;
    updatedAt?: Date;
}

export const userSchema = new Schema<UserInterface>({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, set: hashPassword },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.VIEWER }
},
    { timestamps: true }
)

const UserModel: Model<UserInterface> = mongoose.model<UserInterface>('User', userSchema)

export default UserModel