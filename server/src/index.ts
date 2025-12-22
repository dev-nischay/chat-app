import express from "express";
const app = express();
import cors from "cors";
import "./ws.js";
import { roomRouter } from "./controller.js";
import type { Request, Response, NextFunction } from "express";
import { Httpstatus } from "./types.js";
import { AppError } from "./utils.js";
import { error } from "./error.js";
import http from "http";
import { WebSocketServer } from "ws";

app.use(cors());
app.use(express.json());

app.use("/room", roomRouter);

app.all(/.*/, (req: Request, res: Response, next: NextFunction) => {
  return next(new AppError("Invalid Route", Httpstatus.NotFound));
});

app.use(error);

app.listen(3000, () => {
  console.log(`Server running at Port: 3000`);
});
