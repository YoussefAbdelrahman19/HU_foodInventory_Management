import { Request, Response, NextFunction } from "express";
import * as orderItemService from "../services/incooming-order-item.service";
import { responseUtil } from "../utils/response.util";
export const orderItemControllerFactory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { action, data } = req.body;
    let result = await orderItemService.orderItemFactoryService(action, data);

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
