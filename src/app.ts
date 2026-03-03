import dotenv, { config } from "dotenv";

import express from "express";
// import mainRouter from "./routes/index.js";
import cors from "cors";
// import { env } from "./config/env.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
// app.use("/api/v1", mainRouter);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
