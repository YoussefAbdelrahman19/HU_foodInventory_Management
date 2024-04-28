import { Response, Request, NextFunction } from "express";
import { AppUtils } from "./app.utils";
import { createReqAndRes } from "../config/logger.config";
export const httpStatus = {
  OK: 200,
  NOT_FOUND: 404,
  NOT_UNAUTHORIZED: 401,
  ACCESS_DENIED: 403,
  CREATED: 201,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
};
export const responseUtil = (
  req: Request,
  res: Response,
  message: string,
  status: keyof typeof httpStatus,
  data: { [k: string]: any },
  options?: {
    enableConsoleLog?: boolean;
  }
) => {
  options = { enableConsoleLog: true, ...options };
  const resData = {
    message,
    data,
  };
  if (options.enableConsoleLog) {
    const logId = AppUtils.getRandomId(10);
    data["logId"] = logId;
    createReqAndRes("info", req, "message", resData as any);
  }
  return res.status(httpStatus[status]).json(resData);
};
