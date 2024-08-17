"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config({ path: '../.env' });
const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
    console.log('SECRET_KEY is not defined');
}
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.post("/signin", (req, res) => {
    const { email, password } = req.body;
    const payload = { email, password };
    console.log(payload);
    const token = jsonwebtoken_1.default.sign(payload, "SECRET_KEY!");
    console.log(token);
    res.cookie("token", token);
    res.send("signin");
});
app.get("/user", (req, res) => {
    const token = req.cookies.token;
    const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
    res.send(decoded);
});
app.put("/logout", (req, res) => {
    res.clearCookie("token");
    res.send("signout");
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
