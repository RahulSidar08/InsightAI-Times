import axios from "axios";
import React, { useEffect, useState } from "react";
import NewsFilterCard from "./NewsFilterCard";
import { data, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewsData,
  setNewsAnalysis,
  setSingleNews,
} from "../../redux/newsSlice";
const Dashboard = () => {
  const [newsData, setNewsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("fetching data");
    const getNews = async () => {
      try {
        let res = await axios.get(
          "https://insightai-times.onrender.com/newz/getNews"
        );
        console.log(res);
        setNewsData(res.data.articles);
        dispatch(addNewsData(res.data.articles));
      } catch (error) {
        console.log(error);
      }
    };
    getNews();
  }, []);

  // Fetch when category changes
  useEffect(() => {
    if (selectedCategory) {
      fetchNewsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchNewsByCategory = async (category) => {
    try {
      const res = await axios.get(
        `https://insightai-times.onrender.com/newz/getNews/${category}`
      );
      console.log(res);
      setNewsData(res.data.articles);
    } catch (err) {
      console.error("Failed to fetch news:", err);
    }
  };

  const handleClick = async (news) => {
    console.log(news.article);
    let newsContent = news.article.content;
    console.log(newsContent);
    try {
      const analysis = await axios.post(
        `https://insightai-times.onrender.com/newz/digest`,
        { newsContent },
        { withCredentials: true }
      );
      console.log(analysis);
      dispatch(setSingleNews(news.article.description));
      dispatch(setNewsAnalysis(analysis.data));
      navigate(`/newsAnalysis/${news.article.publishedAt}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex space-x-20">
        <div className="mt-10 ml-5">
          <NewsFilterCard onSelectCategory={setSelectedCategory} />
        </div>
        <div className="min-h-screen bg-gray-50 p-6 mt-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              🗞 Your Personalized News Digest
            </h1>

            {newsData.map((article) => (
              <div
                key={article.publishedAt}
                className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-100 hover:shadow-lg transition"
              >
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-semibold text-blue-600 hover:underline"
                >
                  {article.title}
                </a>
                <p className="text-gray-600 mt-2">{article.description}</p>
                <div className="mt-3 flex justify-between text-sm text-gray-500">
                  <span>
                    📰 Source:{" "}
                    {article.source
                      ? `${article.source.name}`
                      : "Source: Unknown"}
                  </span>
                  <span>{article.source.name}</span>
                  <span>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-semibold text-blue-600 hover:underline"
                    >
                      View Full News
                    </a>
                  </span>
                  <button
                    onClick={() => handleClick(article)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
                  >
                    Get Summary
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
