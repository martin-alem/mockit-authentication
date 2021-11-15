import express, { Request, Response, NextFunction, Router } from "express";
import ErrorHandler from "./../utils/ErrorHandler.js";
import LinkedInLoginController from "./../controller/linkedInLoginController.js";
import checkStateMiddleware from "./../middleware/checkStateMiddleware.js";
import fetchAccessTokenMiddleware from "./../middleware/fetchAccessTokenMiddleware.js";
import fetchUserInfoMiddleware from "./../middleware/fetchUserInfoMiddleware.js";
import checkUserMiddleware from "./../middleware/checkUserMiddleware.js";

const linkedInRouter: Router = express.Router();

linkedInRouter.post("/auth", [
  checkStateMiddleware,
  fetchAccessTokenMiddleware,
  fetchUserInfoMiddleware,
  checkUserMiddleware,
  LinkedInLoginController,
]);

linkedInRouter.use((error: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  res.status(error.statusCode).json({ status: "fail", statusCode: error.statusCode, message: error.message });
});

export default linkedInRouter;
