import express from "express";
// import cors from "cors";

const app = express();

app.use(express.json());
// app.use(cors({ origin: "*" }));

// ROUTES
import contentRoute from "./routes/content.route.js";
import authRouter from "./routes/auth.route.js";
import defaultRoute from "./routes/default.route.js";

app.use("/api/v1/content", contentRoute);
app.use("/api/v1/users", authRouter);
app.use("*", defaultRoute);

// MIDDLEWARES
import { errorHandler } from "./controllers/error.controller.js";
app.use(errorHandler);

export { app };
