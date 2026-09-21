import express from "express";
import cors from "cors";
import helmet from "helmet";

export const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN ?? "*" }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// TODO: mount routers from src/routes/ here as they are built
