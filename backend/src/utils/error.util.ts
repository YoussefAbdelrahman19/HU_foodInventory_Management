import { httpStatus } from "./response.util";

export class AppError extends Error {
  options: {
    ms: number;
    errCode: any;
    isHidden: boolean;
    enableConsoleLog: boolean;
  };
  httpStatusCode: number;
  constructor(
    msg: string,
    status: keyof typeof httpStatus,
    options: {
      ms?: number;
      errCode?: number;
      isHidden?: boolean;
      enableConsoleLog?: boolean;
    } = {}
  ) {
    super(msg);
    this.httpStatusCode = httpStatus[status];
    this.options = {
      ms: 1,
      errCode: this.httpStatusCode,
      isHidden: true,
      enableConsoleLog: true,
      ...options,
    };
  }
}
