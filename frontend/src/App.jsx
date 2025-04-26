import React from "react";
import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./components/Auth/Login";
import { Signup } from "./components/Auth/Signup";
import { Home } from "./components/Home";
import Dashboard from "./components/Demodashboard";
import NewsFilterCard from "./components/Dashboard/NewsFilterCard";
import { NewsAnalysis } from "./components/NewsAnalysis";
import { PageNotFound } from "./components/PageNotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Home />
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <Login />
      </div>
    ),
  },
  {
    path: "/signup",
    element: (
      <div>
        <Signup />
      </div>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <div>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </div>
    ),
  },
  {
    path: "/newsAnalysis/:id",
    element: (
      <div>
        <ProtectedRoute>
          <NewsAnalysis />
        </ProtectedRoute>
      </div>
    ),
  },
  {
    path: "*",
    element: (
      <div>
        <PageNotFound />
      </div>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
