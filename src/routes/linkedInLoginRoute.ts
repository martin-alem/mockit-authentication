import express, { Request, Response, NextFunction, Router } from "express";
import ErrorHandler from "./../utils/ErrorHandler";
import LinkedInLoginController from "./../controller/linkedInLoginController";

const linkedInRouter: Router = express.Router();

linkedInRouter.post("/auth", LinkedInLoginController);

linkedInRouter.use((error: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  res.status(error.statusCode).json({ status: "fail", statusCode: error.statusCode, message: error.message });
});

export default linkedInRouter;