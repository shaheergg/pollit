import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export const comparePassword = async (password: string, hash: string) => {
  const match = await bcrypt.compare(password, hash);
  return match;
};

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

export const generateToken = (user: any) => {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET
  );
  return token;
};
