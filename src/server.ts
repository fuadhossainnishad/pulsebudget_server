import app from "./app";
import databaseConnection from "./config/database.config";
import { envConfig } from "./config/env.config";

databaseConnection()

const port = envConfig.port
app.listen(port, async () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
