import { Request, Response, NextFunction } from "express";
import Errorhandler from "./../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";
import fetch from "../utils/fetch.js";
import { extractProfileData, extractEmailData } from "../utils/util.js";
import { Method } from "axios";

async function fetchUserInfoMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const profileUrl =
      "https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))";
    const emailUrl = "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))";
    const method = "GET" as Method;
    const option1 = {
      url: profileUrl,
      method: method,
      headers: {
        Authorization: `Bearer ${req.body.data.access_token}`,
        "Content-Type": "application/json",
      },
    };
    const option2 = {
      url: emailUrl,
      method: method,
      headers: {
        Authorization: `Bearer ${req.body.data.access_token}`,
        "Content-Type": "application/json",
      },
    };
    const [userProfile, userEmail] = await Promise.all([fetch(option1), fetch(option2)]);

    if (userProfile.statusText === "OK") {
      req.body.userProfile = extractProfileData(userProfile.data);
    } else {
      next(new Errorhandler("Unable to fetch user profile", 403));
    }

    if (userEmail.statusText === "OK") {
      req.body.userEmail = extractEmailData(userEmail.data);
    } else {
      next(new Errorhandler("Unable to fetch user email", 403));
    }
    next();
  } catch (error) {
    Logger.log("error", error as Error, import.meta.url);
    next(new Errorhandler("Internal server error", 500));
  }
}

export default fetchUserInfoMiddleware;
