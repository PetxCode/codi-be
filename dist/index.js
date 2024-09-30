"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const main_1 = require("./main");
const dbConfig_1 = require("./utils/dbConfig");
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const app = (0, express_1.default)();
const PORT = 2277;
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://just-codify.web.app/");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://just-codify.web.app/",
    ],
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)("codifyPlatform"));
app.set("trust proxy", 1);
app.use((0, express_session_1.default)({
    secret: "codifyPlatform",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600 },
}));
(0, main_1.mainApp)(app);
app.listen(process.env.PORT || PORT, () => {
    console.clear();
    (0, dbConfig_1.dbConfig)();
});
module.exports.handler = (0, serverless_http_1.default)(app);
