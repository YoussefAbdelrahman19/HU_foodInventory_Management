import { Like } from "typeorm";
import { Supplier } from "../entities/supplier.entity";
import { AppUtils } from "../utils/app.utils";
import { AppError } from "../utils/error.util";

const supplierRepo = () => {
  return AppUtils.getRepository(Supplier);
};
export const getAll = async (query: { [k: string]: any }) => {
  const queryConditions = [];

  for (const key in query) {
    if (typeof query[key] === "string") {
      queryConditions.push({ [key]: Like(`%${query[key]}%`) });
    }
  }
  const result = await supplierRepo().find({
    where: queryConditions,
  });
  return { suppliers: result };
};
export const insertOne = async (data: Partial<Supplier>) => {
  data["supplierId"] = AppUtils.getRandomId();
  await supplierRepo().insert(data);
  return { supplierId: data.supplierId };
};
export const getOne = async (query: { [k: string]: any }) => {
  const queryConditions = [];

  for (const key in query) {
    if (typeof query[key] === "string") {
      queryConditions.push({ [key]: Like(`%${query[key]}%`) });
    }
  }
  const result = await supplierRepo().findOne({
    where: queryConditions,
  });
  return { supplier: result };
};
export const supplierServiceFactory = async (action: string, data: any) => {
  let result;
  switch (action) {
    case "getAll":
      result = await getAll(data);
      break;
    case "insertOne":
      result = await insertOne(data);
      break;
    case "getOne":
      result = await getOne(data);
      break;
    default:
      throw new AppError(action + " doesn't exist", "BAD_REQUEST");
  }
  return result;
};
