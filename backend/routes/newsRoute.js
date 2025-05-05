import express from "express"
import {analysis, analyzeNews, fetchAllNews, fetchNewsByCategory } from "../controllers/newsControllers.js";
const router = express.Router();
router.route("/analyze").post(analyzeNews)
router.route("/digest").post(analysis)
router.route("/getNews").get(fetchAllNews)
router.route("/getNews/:category").get(fetchNewsByCategory)
export default router