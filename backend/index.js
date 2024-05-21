import "dotenv/config";
import express from "express";
import rootRouter from "./routes/index.js";
import cors from "cors";

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
  console.log(`Successfully listening on port ${PORT}`);
});
