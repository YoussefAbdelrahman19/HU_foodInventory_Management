import { AppError } from "../utils/error.util";
import { AppUtils } from "../utils/app.utils";
import { appEnv } from "../config/env.config";
import { Request, Response, NextFunction } from "express";
const tokenTypes = {
  bearer: "bearer",
};
const jwtKey = {
  DEFUALT_JWT_KEY: appEnv.JWT_KEY,
};
export const checkAuth = (
  targetJwtKey: keyof typeof jwtKey = "DEFUALT_JWT_KEY",
  targetTokenType: keyof typeof tokenTypes = "bearer"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) throw "auth faild";
      const [tokenType, tokenValue] = token.split(" ");
      if (tokenType != targetTokenType) throw "auth faild";
      const decode = AppUtils.verifyJwt(tokenValue, jwtKey[targetJwtKey]);
      return next();
    } catch (error) {
      throw new AppError("auth faild", "NOT_UNAUTHORIZED");
    }
  };
};
