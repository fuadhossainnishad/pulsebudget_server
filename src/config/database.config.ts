import mongoose from "mongoose"
import { envConfig } from "./env.config"
import { extractCSV } from "../lib/extractCSV"
import path from "path"

const filePath: string = path.join(__dirname,'../../public/files/dataset_company_budget_allocation_dashboard.csv'
)
const databaseConnection = async (): Promise<void> => {
    try {
        await mongoose.connect(envConfig.databaseUrl)
        console.log("Connected to database")
        console.log("now extracting CSV")
        await extractCSV(filePath)
        console.log("done extracting CSV")
    } catch (error) {
        console.error("Error connecting to database", error)
        process.exit(1)
    }
}

export default databaseConnection