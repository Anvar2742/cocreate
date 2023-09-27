"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const courseRouter_1 = __importDefault(require("./routes/courseRouter"));
const passport_1 = __importDefault(require("passport"));
const passportConfig_1 = __importDefault(require("./config/passportConfig"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const lessonRouter_1 = __importDefault(require("./routes/lessonRouter"));
// sendEmail().catch(console.error);
// Passport config
(0, passportConfig_1.default)(passport_1.default);
// connect to db
(0, db_1.connect)();
const app = (0, express_1.default)();
const port = 5050;
app.use(express_1.default.json({ limit: "50mb" }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ credentials: true, origin: process.env.FRONT_END_URL }));
app.get("/", (req, res) => {
    res.send("cool!");
});
// Routes
app.use(authRouter_1.default);
app.use(courseRouter_1.default);
app.use(lessonRouter_1.default);
app.listen(port, () => {
    console.log(`Listening on port ${port} ✨`);
});
//# sourceMappingURL=app.js.map