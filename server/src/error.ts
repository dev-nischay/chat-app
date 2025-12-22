import type { ErrorRequestHandler } from "express";
import { AppError } from "./utils.js";

// error middleware
export const error: ErrorRequestHandler = (err: unknown, req, res, next) => {
  if (err instanceof AppError) {
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
      status: false,
      error: err.message || "Something went wrong",
    });
  }

  if (err instanceof Error) {
    console.log(`Unexpected Error : ${err.message} `);
    return res.status(500).json({
      status: false,
      error: "Internal Server Error",
    });
  }
};
