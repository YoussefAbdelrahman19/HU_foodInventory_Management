import express from "express";
import * as orderItemController from "../controllers/order-item.controller";

export const orderItemRoutes = express.Router();
orderItemRoutes.post("/", orderItemController.orderItemControllerFactory);
