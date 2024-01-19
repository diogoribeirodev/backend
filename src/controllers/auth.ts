import bycrypt from "bcryptjs";
import { RequestHandler } from "express";
import { db } from "@/server/db";
import { SignInSchema, SignUpSchema } from "@/server/db/schema";
import { GenerateAccessToken } from "@/utils/authenticate";

export const signUpUser: RequestHandler = async (req, res, next) => {
  try {
    const params = SignUpSchema.parse(req.body);
    const user = await db.user.create({
      data: {
        name: params.name,
        email: params.email,
        password: bycrypt.hashSync(params.password, 8),
      },
    });
    const accessToken = GenerateAccessToken({
      name: user.name,
      email: user.email,
      id: user.id,
    });
    return res.status(201).json({
      name: user.name,
      token: accessToken,
    });
  } catch (error) {
    return next(error);
  }
};

export const signInUser: RequestHandler = async (req, res, next) => {
  try {
    const params = SignInSchema.parse(req.body);
    const user = await db.user.findUnique({
      where: { email: params.email },
    });
    if (!user || !bycrypt.compareSync(params.password, user.password)) {
      return res.status(404).json({
        error: "Authentication Failed",
        description: "Verify your credentials and try again.",
      });
    }
    const accessToken = GenerateAccessToken({
      name: user.name,
      email: user.email,
      id: user.id,
    });
    return res.status(200).json({
      name: user.name,
      token: accessToken,
    });
  } catch (error) {
    return next(error);
  }
};
