// // routes/news.js
// const express = require('express');
// const axios = require('axios');
// const User = require('../models/User');
// const router = express.Router();
// const { Configuration, OpenAIApi } = require('openai');

// // OpenAI setup
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// // Route to fetch news digest
// router.get('/digest/:userId', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     const interests = user.interests; // ['Technology', 'Sports']

//     const allArticles = [];

//     for (const topic of interests) {
//       const newsRes = await axios.get(`https://gnews.io/api/v4/search`, {
//         params: {
//           q: topic,
//           lang: 'en',
//           token: process.env.GNEWS_API_KEY,
//         },
//       });

//       const articles = newsRes.data.articles.slice(0, 3); // Limit to 3 per topic

//       for (const article of articles) {
//         const summary = await getSummary(article.description || article.content);
//         const sentiment = await getSentiment(article.title);

//         allArticles.push({
//           title: article.title,
//           url: article.url,
//           source: article.source.name,
//           summary,
//           sentiment,
//         });
//       }
//     }

//     res.json({ digest: allArticles });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to generate digest' });
//   }
// });

// async function getSummary(text) {
//   const response = await openai.createChatCompletion({
//     model: 'gpt-3.5-turbo',
//     messages: [{
//       role: 'user',
//       content: `Summarize the following news in 2-3 lines:\n\n${text}`
//     }]
//   });

//   return response.data.choices[0].message.content.trim();
// }

// async function getSentiment(text) {
//   const response = await openai.createChatCompletion({
//     model: 'gpt-3.5-turbo',
//     messages: [{
//       role: 'user',
//       content: `Classify the sentiment of this news headline as "positive", "neutral", or "negative":\n\n"${text}"`
//     }]
//   });

//   return response.data.choices[0].message.content.trim().toLowerCase();
// }

// module.exports = router;
// Express route (Node.js backend)
import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv"
dotenv.config()
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// export const analyze = async (req, res) => {
//   const { text } = req.body;

//   try {
//     const prompt = `Analyze the following news for sentiment (positive/negative/neutral) and give a short 2-3 sentence summary:\n\n"${text}"`;

//     const aiRes = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: prompt }],
//     });

//     const reply = aiRes.choices[0].message.content;
//     const [sentiment, ...summaryArr] = reply.split("\n");
//     const sentimentClean = sentiment.replace("Sentiment:", "").trim();
//     const summary = summaryArr.join(" ").replace("Summary:", "").trim();

//     res.json({ sentiment: sentimentClean, summary });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "AI Analysis failed" });
//   }
// };
// router.post('/analyze', async (req, res) => {


import axios from "axios"
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

export const analyzeNews = async (req, res) => {
  const { description } = req.body;

  try {
    // 1. Sentiment
    const sentimentRes = await axios.post(
      "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english",
      { inputs: description },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
        },
      }
    );

    const sentiment = sentimentRes.data[0][0].label;

    // 2. Summary
    const summaryRes = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      { inputs: description },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
        },
      }
    );

    const summary = summaryRes.data[0].summary_text;
    res.json({ sentiment, summary });
  } catch (err) {
    console.error("Hugging Face API error:", err?.response?.data || err.message);
    res.status(500).json({ message: "AI analysis failed", error: err.message });
  }
};

