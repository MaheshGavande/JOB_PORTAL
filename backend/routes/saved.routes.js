import express from "express";
import { toggleSaveJob, toggleSaveQuestion, getSavedItems } from "../controllers/saved.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const savedRouter = express.Router();

savedRouter.use(authMiddleware);

savedRouter.get("/", getSavedItems);
savedRouter.post("/job/:jobId", toggleSaveJob);
savedRouter.post("/question/:questionId", toggleSaveQuestion);

export default savedRouter;