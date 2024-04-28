import * as winston from "winston";
import { Request, response } from "express";
const logger = winston.createLogger({
  level: "info",
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    info: 3,
  },
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ message }) =>
      message.replace(/"([^"]+)":/g, "$1:")
    )
  ),
  transports: [new winston.transports.Console({ level: "info" })],
});
export const createReqAndRes = (
  level: string,
  req: Request,
  logMsg: string,
  data: { [k: string]: any }
) => {
  const headers = JSON.parse(JSON.stringify(req.headers));
  delete headers["authorization"];
  const requestInfo = {
    url: req.originalUrl,
    method: req.method,
    body: req.body,
    params: req.params,
    queryParams: req.query,
    headers,
  };
  return logger.log(
    level,
    JSON.stringify({
      ms: 1,
      logMsg,
      ...requestInfo,
      responseData: data,
    })
  );
};
