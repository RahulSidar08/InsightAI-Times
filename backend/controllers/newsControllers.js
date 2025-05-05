import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
export const analyzeNews = async (req, res) => {
  try {
    const { description } = req.body;
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
    console.error(
      "Hugging Face API error:",
      err?.response?.data || err.message
    );
    res.status(500).json({ message: "AI analysis failed", error: err.message });
  }
};

export const analysis = async (req, res) => {
  try {
    const { newsContent } = req.body;

    if (!newsContent) {
      return res.status(400).json({ error: "News content is required." });
    }

    // Summarization
    const summaryResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Summarize the following news article:\n\n${newsContent}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Sentiment Analysis
    const sentimentResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Analyze the sentiment (positive, negative, or neutral) of this news article and give brief description on it:\n\n${newsContent}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      summary: summaryResponse.data.choices[0].message.content,
      sentiment: sentimentResponse.data.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error analyzing news:", error.message);
    res.status(500).json({ error: "Failed to analyze news." });
  }
};

export const fetchAllNews = async (req, res) => {
  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: { q: "technology", language: "en" },
      headers: { "X-Api-Key": process.env.NEWS_API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error in fetching news:", error.message);
    res.status(500).json({ error: "Failed to Fetch news." });
  }
};

export const fetchNewsByCategory = async (req, res) => {
  try {
    const {category} = req.params;
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${category}&language=en&apiKey=fe1d4a39adaa4102acadb067211992ba`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error in fetching news:", error.message);
    res.status(500).json({ error: "Failed to Fetch news." });
  }
};
