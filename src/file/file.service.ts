import FileModel, { FileInterface } from "./file.schema"


export const isFileExistService = async (path: string): Promise<boolean> => {
    const isExist = await FileModel.findOne({ fileName: path })
    return !!isExist
}

export const insertFileInfoService = async (fileName: string): Promise<FileInterface | boolean> => {
    const fileInfo = await isFileExistService(fileName)
    if (fileInfo) {
        return !!fileInfo
    }
    const fileInfoInsert = await FileModel.insertOne({ fileName })
    if (!fileInfoInsert) {
        return !!fileInfoInsert
    }
    return fileInfoInsert
}