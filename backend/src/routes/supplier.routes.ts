import express from "express";
import * as supplierController from "../controllers/supplier.controller";

export const supplierRoutes = express.Router();
supplierRoutes.post("/", supplierController.supplierControllerFactory);
