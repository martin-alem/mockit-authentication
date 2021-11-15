import { Request, Response, NextFunction } from "express";
import fetch from "./../utils/fetch.js";
import ErrorHandler from "./../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";
import qs from "qs";
import { AxiosResponse, Method } from "axios";

async function fetchAccessTokenMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const url = "https://www.linkedin.com/oauth/v2/accessToken";
    const method = "POST" as Method;
    const data: string = qs.stringify({
      grant_type: process.env.GRANT_TYPE,
      code: req.body.code,
      redirect_uri: process.env.REDIRECT_URI,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    });
    const option = {
      url,
      method,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      data,
    };
    const response: AxiosResponse = await fetch(option);

    if (response.status !== 200) {
      next(new ErrorHandler("Could not fetch access token", 403));
    } else {
      req.body.data = response.data;
      next();
    }
  } catch (error) {
    Logger.log("error", error as Error, import.meta.url);
    next(new ErrorHandler("Internal server error", 500));
  }
}

export default fetchAccessTokenMiddleware;
