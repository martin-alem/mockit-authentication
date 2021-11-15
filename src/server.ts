import express, { Request, Response, Express } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import linkedInRouter from "./routes/linkedInLoginRoute.js";

import connectionToDatabase from "./database/connection.js";


connectionToDatabase()

const app: Express = express();

//Cors configuration
const corsOptions = {
  origin: true,
  credentials: true,
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.enable("trust proxy");
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1/linkedin/", linkedInRouter);

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ status: 404, statusText: "fail", message: "The path you are requesting does not exist" });
});

const PORT: string = process.env.PORT || `3000`;
app.listen(PORT, () => {
  console.log(`Authentication Server Listening On Port ${PORT}`);
});
