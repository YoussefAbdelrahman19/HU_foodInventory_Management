import { Request, Response, NextFunction } from "express";
import * as lookupService from "../services/lookups.service";
import { AppError } from "../utils/error.util";
import { responseUtil } from "../utils/response.util";
export const insertLookup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = null;
    const { action, data } = req.body;
    switch (action) {
      case "insertLookupGroup":
        result = await lookupService.insertLookupGroup(data);
        break;
      case "insertLookup":
        result = await lookupService.insertLookup(data);
        break;
      case "insertLookupDetail":
        result = await lookupService.insertLookupDetail(data);
        break;
      default:
        throw new AppError(action + " does not exist", "BAD_REQUEST");
    }
    return responseUtil(
      req,
      res,
      action + " executed successfully ",
      "CREATED",
      result
    );
  } catch (err) {
    return next(err);
  }
};
export const getLookup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { targetLookup } = req.params;
    let id = req.query.id as string | undefined;
    id = id?.trim() == "''" || id?.trim() == '""' || !id ? undefined : id;
    let result;
    switch (targetLookup) {
      case "lookupGroup":
        result = await lookupService.getLookupGroups();
        break;
      case "lookup":
        result = await lookupService.getLookup(id);
        break;
      case "lookupDetail":
        result = await lookupService.getLookupDetail(id);
        break;
      default:
        throw new AppError(targetLookup + " does not exist", "BAD_REQUEST");
    }
    return responseUtil(
      req,
      res,
      targetLookup + " retrived successfully ",
      "OK",
      result
    );
  } catch (err) {
    return next(err);
  }
};
