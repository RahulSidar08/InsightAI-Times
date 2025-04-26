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
        console.log(data)
        const res = await axios.post("http://localhost:3000/user/register",data,{
            withCredentials:true
        })
        console.log(res)
        successHandler(res.data.message)
    } catch (error) {
        // console.log(error.response)
        if (error.response && error.response.data) {
            errorHandler(error.response.data.message);
          } else {
            console.error("Unknown error:", error.message);
            errorHandler("Something went wrong. Please try again.");
          }
    }
  }
  return (
    <>
      <div className="w-full min-h-screen bg-white flex justify-center items-center">
        <div className="shadow-lg w-[40%] flex flex-col py-4">
          <p className="font-semibold text-center text-2xl">
            Create Your Account{" "}
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="p-4" action="">
            <div className="flex flex-col gap-1 mt-1 p-2">
              <label htmlFor="fullName">FullName</label>
              <input
              {...register("fullName", { required: true })}
                className="py-3 px-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Enter Your Name"
              />
            {errors.fullName && <span className="text-red-600">This field is required</span>}
            </div>
            <div className="flex flex-col gap-1 mt-1 p-2">
              <label htmlFor="email">Email Address</label>
              <input
                 {...register("email", { required: true })}
                className="py-3 px-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="email"
                id="email"
                placeholder="Enter Your Name"
              />
                {errors.email && <span className="text-red-600">This field is required</span>}
            </div>
            <div className="flex flex-col gap-1 mt-1 p-2">
              <label htmlFor="password">Password</label>
              <input
                {...register("password", { required: true })}
                className="py-3 px-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                name="password"
                id="password"
                placeholder="Enter Your Name"
              />
            {errors.password && <span className="text-red-600">This field is required</span>}
            </div>
            <div className="flex flex-col gap-1 mt-1 p-2">
              <fieldset>
                <legend>Select your news preferences:</legend>
                {preferencesList.map((pref) => (

                  <label key={pref} className="mt-3 py-2 px-2 items-center">
                    <input className="mt-3 py-2 px-2 items-center"
                    {...register("preferences", { required: true })}
                      type="checkbox"
                      name="preferences"
                      value={pref}
                    />
                    {pref}
                  </label>
                ))}
              </fieldset>
            </div>
            <div className="flex flex-col justify-center items-center mt-4">
              <button className="w-[97%] bg-blue-500 py-2 rounded-md hover:bg-blue-600">
                signup
              </button>
              <p>
                If yoy Don't have an Account <Link to="/login">Login</Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    <ToastContainer/>
    </>
  );
};
