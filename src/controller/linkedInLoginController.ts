import { Request, Response, NextFunction } from "express";
import ErrorHandler from "./../utils/ErrorHandler.js";

function LinkedInLoginController(req: Request, res: Response, next: NextFunction): void {
  try {
    res.status(200).json({ status: "success" });
  } catch (error: unknown) {
    next(new ErrorHandler("Internal server error", 500));
  }
}

export default LinkedInLoginController;
