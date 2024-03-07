import db from "../db";
import { comparePassword, generateToken, hashPassword } from "../lib/utils";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await db.user.create({
      data: {
        name,
        email,
        password: await hashPassword(password),
      },
    });
    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const signIn = async (req, res) => {
  const user = await db.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  const isValid = await comparePassword(req.body.password, user.password);
  if (!isValid) {
    res.status(401);
    res.json({ message: "Invalid username or password" });
    return;
  }
  const token = generateToken(user);
  res.json({ token });
};
