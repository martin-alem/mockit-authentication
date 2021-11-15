"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandler_1 = __importDefault(require("./../utils/ErrorHandler"));
function LinkedInLoginController(req, res, next) {
    try {
        res.status(200).json({ status: "success" });
    }
    catch (error) {
        next(new ErrorHandler_1.default("Internal server error", 500));
    }
}
exports.default = LinkedInLoginController;
