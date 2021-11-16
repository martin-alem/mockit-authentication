import express, { Request, Response, NextFunction, Router } from "express";
import ErrorHandler from "./../utils/ErrorHandler.js";

import googleLoginController from "./../controller/loginController.js";
import checkUserMiddleware from "./../middleware/checkUserMiddleware.js";
import validateGoogleUserMiddleware from "./../middleware/validateGoogleUserMiddleware.js";

const googleLoginRoute: Router = express.Router();

googleLoginRoute.post("/auth", [validateGoogleUserMiddleware, checkUserMiddleware, googleLoginController]);

googleLoginRoute.use((error: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  res.status(error.statusCode).json({ status: "fail", statusCode: error.statusCode, message: error.message });
});

export default googleLoginRoute;
