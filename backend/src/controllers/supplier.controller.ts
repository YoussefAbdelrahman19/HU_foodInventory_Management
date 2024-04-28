import { Request, Response, NextFunction, response } from "express";
import * as supplierService from "../services/supplier.service";
import { responseUtil } from "../utils/response.util";
export const supplierControllerFactory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { action, data } = req.body;
    const result = await supplierService.supplierServiceFactory(action, data);
    return responseUtil(
      req,
      res,
      action + " executed successfully",
      "OK",
      result
    );
  } catch (err) {
    return next(err);
  }
};
