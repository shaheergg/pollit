import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  console.log("protect");
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }
  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json({ message: "not valid token" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    res.json({ message: "not valid token" });
    return;
  }
};
