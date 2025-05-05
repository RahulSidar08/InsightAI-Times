import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { errorHandler, successHandler } from "../../utils/ToastMessage";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
export const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "https://insightai-times.onrender.com/user/login",
        data,
        {
          withCredentials: true,
        }
      );
      console.log(res.data.user);
      dispatch(setUser(res.data.user));
      successHandler(res.data.message);
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      // console.log(error.response)
      if (error.response && error.response.data) {
        errorHandler(error.response.data.message);
      } else {
        console.error("Unknown error:", error.message);
        errorHandler("Something went wrong. Please try again.");
      }
    }
  };
  return (
    <>
      <div className="w-full min-h-screen bg-white flex justify-center items-center px-4">
        <div className="shadow-lg w-full sm:w-[90%] md:w-[70%] lg:w-[40%] flex flex-col py-6 px-4 bg-white rounded-lg">
          <p className="font-semibold text-center text-2xl mb-4">
            Create Your Account
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="email">Email Address</label>
              <input
                {...register("email", { required: true })}
                className="py-3 px-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                {...register("password", { required: true })}
                className="py-3 px-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm mt-1">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="w-full bg-blue-500 py-2 rounded-md text-white font-semibold hover:bg-blue-600 transition-colors"
              >
                Login
              </button>
              <p className="text-sm mt-3">
                If you don't have an account,{" "}
                <Link to="/signup" className="text-blue-600 underline">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
