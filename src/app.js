import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import mocksRouter from "./routes/mocks.router.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/mocks", mocksRouter);

app.get("/", (req, res) => res.send("Backend 3 - Entrega 1 OK"));

const PORT = Number(process.env.PORT ?? 8080);

await connectDB(process.env.MONGO_URI);

app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));
