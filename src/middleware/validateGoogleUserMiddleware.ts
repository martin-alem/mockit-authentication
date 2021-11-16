import { Request, Response, NextFunction } from "express";
import ErrorHandler from "./../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";

function validateGoogleUserMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { firstName, lastName, imageUrl, emailAddress } = req.body;
    if (firstName && lastName && imageUrl && emailAddress) {
      next();
    } else {
      res.status(400).json({ status: "fail", statusCode: 400, message: "missing a required filed" });
    }
  } catch (error) {
    Logger.log("error", error as Error, import.meta.url);
    next(new ErrorHandler("Internal server error", 500));
  }
}

export default validateGoogleUserMiddleware;
