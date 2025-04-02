import mongoose, { Document, Schema } from "mongoose";

export interface FileInterface extends Document {
    fileName: string;
    extractedAt: Date
    createdAt?: Date
    updatedAt?: Date
}

export const fileSchema = new Schema<FileInterface>({
    fileName: { type: String, required: true },
    extractedAt: { type: Date, default: Date.now }
},
    { timestamps: true }
);

const FileModel = mongoose.model<FileInterface>('File', fileSchema)
export default FileModel