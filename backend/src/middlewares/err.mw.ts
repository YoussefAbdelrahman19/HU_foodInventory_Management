import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/error.util";
import { createReqAndRes } from "../config/logger.config";
import { AppUtils } from "../utils/app.utils";

export const errMw = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errRes: { msg: string; isHidden: boolean; ms: number; errCode: number };
  let resCode: number;
  let isLogEnabled: boolean = true;
  if (err.constructor.name === "AppError" && err instanceof AppError) {
    resCode = err.httpStatusCode;
    const { enableConsoleLog, ...options } = err.options;
    isLogEnabled = enableConsoleLog;
    errRes = {
      ...options,
      msg: err.message,
    };
  } else {
    resCode = 500;
    errRes = {
      ms: 1,
      msg: "un expected error occurred",
      isHidden: false,
      errCode: 500,
    };
  }
  let logId!: string;
  if (isLogEnabled) {
    logId = AppUtils.getRandomId(10);
    createReqAndRes("error", req, err.message, {
      ...errRes,
      msg: err.message,
      logId,
    } as any);
  }
  return res.status(resCode).json({ ...errRes, logId });
};
