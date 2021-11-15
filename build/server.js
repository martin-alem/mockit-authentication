"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const linkedInLoginRoute_1 = __importDefault(require("./routes/linkedInLoginRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
//Cors configuration
const corsOptions = {
    origin: true,
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.enable("trust proxy");
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use("/api/v1/linkedin/", linkedInLoginRoute_1.default);
app.all("*", (req, res) => {
    res.status(404).json({ status: 404, statusText: "fail", message: "The path you are requesting does not exist" });
});
const PORT = process.env.PORT || `3000`;
app.listen(PORT, () => {
    console.log(`Authentication Server Listening On Port ${PORT}`);
});
