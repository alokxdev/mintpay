import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { env } from "../config/env.js";

export const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  }

  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Unique constraint failed",
      });
    }

    if (err.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }
  }

  if (err instanceof Error) {
    return res.status(500).json({
      success: false,
      message:
        env.NODE_ENV === "production" ? "Internal server error" : err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
