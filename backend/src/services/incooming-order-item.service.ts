import { IncoomingOrderItem } from "../entities/incooming-order-item.entity";
import { AppUtils } from "../utils/app.utils";
import { AppError } from "../utils/error.util";
import { incoomingOrderRepo } from "./order.service";

export const incoomingOrderItemRepo = () => {
  return AppUtils.getRepository(IncoomingOrderItem);
};
export const orderItemFactoryService = async (
  action: string,
  data: { [k: string]: any }
) => {
  let result;
  switch (action) {
    case "createIncoomingOrderItem": {
      const orderItemData = data as IncoomingOrderItem;
      const orderId = data.orderId;
      const order = await incoomingOrderRepo().findOne({
        where: { orderId },
      });
      if (!order) {
        throw new AppError("order does not exist", "NOT_FOUND");
      }
      const orderItemId = AppUtils.getRandomId();
      orderItemData["orderItemId"] = orderItemId;
      orderItemData["order"] = order;
      await incoomingOrderItemRepo().insert(orderItemData);
      result = { orderItemId };
      break;
    }
    case "getIncoomingOrderItemsByOrderId": {
      const orderItems = await incoomingOrderItemRepo().find({
        where: {
          orderId: data.orderId,
        },
      });
      result = { orderItems };
      break;
    }
    default:
      throw new AppError(action + " does not exist ", "BAD_REQUEST");
  }
  return result;
};
