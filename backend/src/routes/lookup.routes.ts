import express from "express";
import * as lookupController from "../controllers/lookup.controller";

export const lookupRoutes = express.Router();
lookupRoutes.post("/", lookupController.insertLookup);
lookupRoutes.get("/:targetLookup", lookupController.getLookup);
