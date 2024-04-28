import { Request, Response, NextFunction } from "express";
import * as employeeService from "../services/employee.service";
import { responseUtil } from "../utils/response.util";
import { AppUtils } from "../utils/app.utils";
import { appEnv } from "../config/env.config";
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await employeeService.register(req.body);
    return responseUtil(
      req,
      res,
      "employee resgistered successfully",
      "CREATED",
      {}
    );
  } catch (err) {
    return next(err);
  }
};
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userName, password } = req.body;
    const employee = await employeeService.login(userName, password);
    const token = AppUtils.jwtSign(
      {
        empId: employee.empId,
        userName: employee.userName,
      },
      appEnv.JWT_KEY
    );
    return responseUtil(req, res, "login sucessfully completed", "OK", {
      token,
    });
    return res.status(200).json({
      message: "login sucessfully completed",
      data: { token },
    });
  } catch (err) {
    return next(err);
  }
};
