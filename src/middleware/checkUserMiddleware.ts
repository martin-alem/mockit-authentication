import { Request, Response, NextFunction } from "express";
import Errorhandler from "./../utils/ErrorHandler.js";
import Logger from "./../utils/Logger.js";
import User from "./../model/UserModel.js";
import ProfileModel from "./../model/ProfileModel.js";
import { findOne, insertOne, findAndUpdate } from "./../service/query.js";

async function checkUserMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { firstName, lastName, imageUrl } = req.body.userProfile || req.body;
    const { emailAddress } = req.body.userEmail || req.body;
    const user = { firstName, lastName, emailAddress, imageUrl };
    const result = await findOne(User, { emailAddress: emailAddress });
    if (!result) {
      const newUser = await insertOne(User, user);
      const profileData = { userId: newUser._id, lastUpdate: new Date() };
      const profile = await insertOne(ProfileModel, profileData);
      if (profile) {
        req.body.profile = profile;
        req.body.user = newUser;
        next();
      } else {
        next(new Errorhandler("Error creating profile", 404));
      }
    } else {
      const existingUser = await findAndUpdate(User, { emailAddress: emailAddress }, { imageUrl: imageUrl });
      if (existingUser) {
        const existingProfile = await findOne(ProfileModel, { userId: existingUser._id });
        req.body.user = existingUser;
        req.body.profile = existingProfile;
        next();
      } else {
        next(new Errorhandler("No user found", 404));
      }
    }
  } catch (error) {
    Logger.log("error", error as Error, import.meta.url);
    next(new Errorhandler("Internal server error", 500));
  }
}

export default checkUserMiddleware;
