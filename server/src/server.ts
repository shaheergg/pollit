import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./router";
import { protect } from "./middlewares/auth";
import { createUser, signIn } from "./controllers/user";
import { body } from "express-validator";
import { errorHandler } from "./middlewares/errorHandler";
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", protect, router);
app.post("/register", createUser);
app.post(
  "/signin",
  body("email").isString(),
  body("password").isString(),
  errorHandler,
  signIn
);
export default app;
