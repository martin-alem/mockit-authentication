/**
 * Documentation explaining explaining what this middleware does.
 */
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler.js";
import Logger from "../utils/Logger.js";

function checkStateMiddleware(req: Request, res: Response, next: NextFunction): void {
  try {
    const state = req.body.state;
    if (state !== process.env.STATE) {
      next(new ErrorHandler("Invalid state", 401));
    } else {
      next();
    }
  } catch (error) {
    Logger.log("error", error as Error, import.meta.url);
    next(new ErrorHandler("Internal server error", 500));
  }
}

export default checkStateMiddleware;
