import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { errorHandler, successHandler } from "../../utils/ToastMessage";
import { ToastContainer } from "react-toastify";
import axios from "axios";
export const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const preferencesList = [
    "sports",
    "politics",
    "bollywood",
    "technology",
    "health",
  ];
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const res = await axios.post(
        "https://insightai-times.onrender.com/user/register",
        data,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      successHandler(res.data.message);
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
        <div className="shadow-lg w-full sm:w-[90%] md:w-[70%] lg:w-[40%] flex flex-col py-6 px-6 bg-white rounded-lg">
          <p className="font-semibold text-center text-2xl mb-4">
            Create Your Account
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="fullName">Full Name</label>
              <input
                {...register("fullName", { required: true })}
                className="py-3 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="fullName"
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <span className="text-red-600 text-sm mt-1">
                  This field is required
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="email">Email Address</label>
              <input
                {...register("email", { required: true })}
                className="py-3 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                id="email"
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-red-600 text-sm mt-1">
                  This field is required
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                {...register("password", { required: true })}
                className="py-3 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                id="password"
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="text-red-600 text-sm mt-1">
                  This field is required
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <fieldset className="border border-gray-200 rounded p-3">
                <legend className="font-medium mb-2">
                  Select your news preferences:
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {preferencesList.map((pref) => (
                    <label key={pref} className="flex items-center gap-2">
                      <input
                        {...register("preferences", { required: true })}
                        type="checkbox"
                        value={pref}
                      />
                      {pref}
                    </label>
                  ))}
                </div>
                {errors.preferences && (
                  <span className="text-red-600 text-sm mt-2 block">
                    Please select at least one preference.
                  </span>
                )}
              </fieldset>
            </div>

            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="w-full bg-blue-500 py-2 rounded-md text-white font-semibold hover:bg-blue-600 transition-colors"
              >
                Sign Up
              </button>
              <p className="text-sm mt-3">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 underline">
                  Log in
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
