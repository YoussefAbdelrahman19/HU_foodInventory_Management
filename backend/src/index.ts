import * as dotenv from "dotenv";
dotenv.config();
import app from "./app";
import http from "http";
import { appEnv } from "./config/env.config";
import { AppDataSource } from "./config/data-source.config";
AppDataSource.then(() => {
  const server = http.createServer(app);
  console.log("db connection established");
  server.listen(appEnv.SERVER_PORT, () => {
    console.log("server is running on port " + appEnv.SERVER_PORT);
  });
}).catch((err) => {
  console.log("db connection error ", err);
});
