import express from "express";
import * as employeeController from "../controllers/employee.controller";

export const employeeRoutes = express.Router();
employeeRoutes.post("/register", employeeController.register);
employeeRoutes.post("/login", employeeController.login);
