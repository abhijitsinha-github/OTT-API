import express from "express";

const app = express();

app.use(express.json());

// ROUTES
import contentRoute from "./routes/content.route.js";
import defaultRoute from "./routes/default.route.js";

app.use("/api/v1/content", contentRoute);
app.use("*", defaultRoute);

// MIDDLEWARES
import { errorHandler } from "./controllers/error.controller.js";
app.use(errorHandler);

export { app };
