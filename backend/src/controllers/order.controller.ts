import { Request, Response, NextFunction } from "express";
import * as orderService from "../services/order.service";
import { responseUtil } from "../utils/response.util";
export const orderControllerFactory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { action, data } = req.body;
    let result = await orderService.orderServiceFactory(action, data);
    return responseUtil(
      req,
      res,
      action + " execute successfully",
      "OK",
      result
    );
  } catch (err) {
    return next(err);
  }
};
