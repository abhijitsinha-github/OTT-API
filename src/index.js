import "dotenv/config";
import mongoose from "mongoose";

// Uncaught Exception Handling
process.on("uncaughtException", (error) => {
  console.log("Unhandled Exception occur", error);
  process.exit(1);
});

import { app } from "./app.js";

const PORT = process.env.PORT;

// SERVER SETUP
const server = app.listen(PORT, async () => {
  await mongoose.connect(`${process.env.LOCAL_MONGODB}/ott_api`);
  console.log("Connected to MongoDB");
  console.log(`Server is running at http://localhost:${PORT}/`);
});

// Unhandled Rejection Handling
process.on("unhandledRejection", (error) => {
  console.log("Unhandled Rejection occur, Shutting down the server!");

  server.close();
  process.exit(1);
});
