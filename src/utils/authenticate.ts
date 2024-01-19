import jwt from "jsonwebtoken";
import { User } from "../types/user";

const secret = process.env.JWT_SECRET as string;

export const GenerateAccessToken = (userInfo: User) => {
  return jwt.sign(userInfo, secret, { expiresIn: "7d" });
};

export const CertifyAccessToken = (token: string) => {
  return jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      throw err;
    }
    return decoded;
  });
};
