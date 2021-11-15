import Logger from "./../utils/Logger.js";
import mongoose, { Document} from "mongoose";

export async function findOne(model: mongoose.Model<any, {}, {}, {}>, query: { [key: string]: any }): Promise<Document | undefined> {
  try {
    const document: Document = await model.findOne(query);
    return document;
  } catch (error) {
    Logger.log("Error", error as Error, import.meta.url);
    throw error;
  }
}

export async function insertOne(model: mongoose.Model<any, {}, {}, {}>, data: { [key: string]: any }): Promise<any> {
  try {
    const result = await model.create(data);
    return result;
  } catch (error) {
    Logger.log("Error", error as Error, import.meta.url);
    throw error;
  }
}

export async function findAndUpdate(
  model: mongoose.Model<any, {}, {}, {}>,
  filter: { [key: string]: any },
  data: { [key: string]: any }
): Promise<Document | undefined> {
  try {
    const document: Document = await model.findOneAndUpdate(filter, data, { new: true });
    return document;
  } catch (error) {
    Logger.log("Error", error as Error, import.meta.url);
    throw error;
  }
}

