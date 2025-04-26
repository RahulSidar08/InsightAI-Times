import express from "express"
import {analysis, analyzeNews } from "../controllers/newsControllers.js";
const router = express.Router();
router.route("/analyze").post(analyzeNews)
router.route("/digest").post(analysis)
export default router