import express from "express";
import * as orderController from "../controllers/order.controller";

export const orderRoutes = express.Router();
orderRoutes.post("/", orderController.orderControllerFactory);
