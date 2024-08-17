import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt, { JwtPayload } from "jsonwebtoken";
import path from "path";
require('dotenv').config({ path: '../.env' })

const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
    console.log('SECRET_KEY is not defined');
}

const app = express();


app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
}   );

app.post("/signup", (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const token = jwt.sign({ email, password },SECRET_KEY!);
    res.cookie("token",token)
    res.send("signin");
}   );

app.get("/user", (req, res) => {
   
  const token = req.cookies.token;
  const decoded = jwt.verify(token, SECRET_KEY!) as JwtPayload;
  res.send(decoded);
}  );

app.put("/logout", (req, res) => {

    res.clearCookie("token");
    res.send("signout");
}   );

app.listen(3000, () => {
  console.log("Server is running on port 3000");
}   );