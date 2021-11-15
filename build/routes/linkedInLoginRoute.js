"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const linkedInLoginController_1 = __importDefault(require("./../controller/linkedInLoginController"));
const linkedInRouter = express_1.default.Router();
linkedInRouter.post("/auth", linkedInLoginController_1.default);
linkedInRouter.use((error, req, res, next) => {
    res.status(error.statusCode).json({ status: "fail", statusCode: error.statusCode, message: error.message });
});
exports.default = linkedInRouter;
