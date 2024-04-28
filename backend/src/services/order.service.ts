import { Like } from "typeorm";
import { IncoomingOrder } from "../entities/incooming-order.entity";
import { AppUtils } from "../utils/app.utils";
import { AppError } from "../utils/error.util";
export const incoomingOrderRepo = () => {
  return AppUtils.getRepository(IncoomingOrder);
};
export const orderServiceFactory = async (
  action: string,
  data: { [k: string]: any }
) => {
  let result;
  const orderId = AppUtils.getRandomId();
  switch (action) {
    case "createIncoomingOrder":
      const orderData = data as IncoomingOrder;
      orderData.arrivalDate = new Date(orderData.arrivalDate);
      orderData.expirationDate = new Date(orderData.expirationDate);
      await incoomingOrderRepo().insert({
        ...orderData,
        orderId,
      });
      result = { orderId };
      break;
    case "getIncoomingOder": {
      const queryConditions = [];
      for (const key in data) {
        if (typeof data[key] === "string") {
          queryConditions.push({ [key]: Like(`%${data[key]}%`) });
        }
      }
      const orders = await incoomingOrderRepo().find({
        where: queryConditions,
      });
      result = { orders };
      break;
    }
    case "getIncoomingOrderById": {
      const orders = await incoomingOrderRepo().findOne({
        where: { orderId: data.orderId },
        relations: ["orderItems"],
        join: {
          alias: "order",
          leftJoinAndSelect: {
            orderItems: "order.orderItems",
          },
        },
      });
      result = { orders };
      break;
    }
    default:
      throw new AppError(action + " does not exist", "BAD_REQUEST");
  }
  return result;
};
