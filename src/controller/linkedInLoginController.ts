import { Request, Response, NextFunction } from "express";
import ErrorHandler from "./../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";
import jwt from "jsonwebtoken";

function LinkedInLoginController(req: Request, res: Response, next: NextFunction): void {
  try {
    const user = req.body.user;
    const profile = req.body.profile;
    const JWT_SECRET: string = process.env.JWT_SECRET!;
    const accessToken = jwt.sign({ user_id: user["_id"] }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("_access_token", `${accessToken}`, {
      expires: new Date(Date.now() + 1 * 3600000),
      httpOnly: true,
      // domain: ".mockit.org",
      sameSite: "lax",
    });
    res.status(200).json({ status: "success", statusCode: 200, user, profile });
  } catch (error: unknown) {
    Logger.log("error", error as Error, import.meta.url);
    next(new ErrorHandler("Internal server error", 500));
  }
}

export default LinkedInLoginController;
