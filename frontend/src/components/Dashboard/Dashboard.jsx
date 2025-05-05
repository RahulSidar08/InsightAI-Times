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
      <div className="flex flex-col md:flex-row md:space-x-10">
        <div className="mt-6 md:mt-10 md:ml-5">
          <NewsFilterCard onSelectCategory={setSelectedCategory} />
        </div>
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 mt-6 md:mt-10 w-full">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
              🗞 Your Personalized News Digest
            </h1>

            {newsData.map((article) => (
              <div
                key={article.publishedAt}
                className="bg-white shadow-md rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-100 hover:shadow-lg transition"
              >
                <p className="text-lg sm:text-xl font-semibold text-blue-600 hover:underline">
                  {article.title}
                </p>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                  {article.description}
                </p>
                <div className="mt-3 flex flex-col sm:flex-row sm:justify-between text-sm text-gray-500 gap-2">
                  <span>
                    📰 Source:{" "}
                    {article.source ? article.source.name : "Unknown"}
                  </span>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    View Full News
                  </a>
                  <button
                    onClick={() => handleClick({ article })}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out w-full sm:w-auto"
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
