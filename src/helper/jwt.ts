import jwt from "jsonwebtoken";

export const generateToken = (userId: any) => {
  // @ts-ignore
  return jwt.sign(userId, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

export const checkToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    return false;
  }
};
