import express from "express";
import dotenv from "dotenv";
import expressConfig from "./express.js";
import serverConfig from "./server.js";
// import dependencies from "./frameworks/config/dependencies";
import connectDB from "./config/db.connect.js";
import config from "./config/config.js"
// import { routes } from "./adapters/router";

dotenv.config();


// Set up Express app
const app = express();

// Apply the Express config
const server = expressConfig(app);

// Connect to the database
connectDB(config);

// Set up routes with dependencies
// app.use("/", routes(dependencies));

// Start the server
serverConfig(server, config).startServer();
