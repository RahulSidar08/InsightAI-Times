import express from "express"
import {analyzeNews } from "../controllers/newsControllers.js";
const router = express.Router();
router.route("/analyze").post(analyzeNews)

export default router