import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import store from "../redux/store";
import axios from "axios";
import { addNewsData } from "../redux/newsSlice";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
export const NewsAnalysis = () => {
  const params = useParams();
  const newsData = useSelector((state) => state.news.newsData);
  const analysis = useSelector((state) => state.news.Analysis);
  const singleNews = useSelector((state) => state.news.singleNews);

  const downloadPDF = async () => {
    const report = document.getElementById("report");
    if (!report) return;

    const canvas = await html2canvas(report, {
      scale: 2,
      useCORS: true,
      onclone: (clonedDoc) => {
        const elements = clonedDoc.querySelectorAll("*");
        elements.forEach((el) => {
          const color = window.getComputedStyle(el).color;
          if (color.includes("oklch")) {
            el.style.color = "black";
          }
          const backgroundColor = window.getComputedStyle(el).backgroundColor;
          if (backgroundColor.includes("oklch")) {
            el.style.backgroundColor = "white";
          }
        });
      },
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("news-analysis-report.pdf");
  };

  useEffect(() => {
    console.log("fetching data");
    const getNews = async () => {
      try {
        let res = await axios.get(
          "https://newsapi.org/v2/everything?q=technology&language=en&apiKey=fe1d4a39adaa4102acadb067211992ba"
        );
        addNewsData(res.data.articles);
        // console.log(res.data.articles);
      } catch (error) {
        console.log(error);
      }
    };
    getNews();
  }, []);

  return (
    <>
      <div className="p-6 max-w-3xl mx-auto" id="report">
        <h1 className="text-2xl font-bold mb-4">News Analysis</h1>

        <div className="bg-white shadow p-4 rounded mb-6">
          <h2 className="text-lg font-semibold mb-2">Original Description</h2>
          <p className="text-gray-700">{singleNews[0]}</p>
        </div>

        <div className="bg-gray-100 shadow p-4 rounded mb-6">
          <h2 className="text-lg font-semibold mb-2">Summary</h2>
          <p>{analysis[0].summary}</p>
        </div>

        <div className="bg-blue-50 shadow p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Sentiment</h2>
          <p
            className={`font-bold ${
              newsData.sentiment === "Positive"
                ? "text-green-600"
                : newsData.sentiment === "Negative"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {analysis[0].sentiment}
          </p>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <button
          className="px-2 py-3 bg-green-400 hover:bg-green-500"
          onClick={downloadPDF}
        >
          Download Report as PDF
        </button>
      </div>
    </>
  );
};
