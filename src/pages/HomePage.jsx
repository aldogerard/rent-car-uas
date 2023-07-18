import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { FaCircleCheck } from "react-icons/fa6";
import IconButton from "@mui/material/IconButton";

const HomePage = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FBBF24",
      },
    },
  });
  return (
    <>
      <main className="pt-[50px] md:pt-[150px] lg:pt-[130px] -z-50">
        <section className="h-[80vh] w-full bg-[url(images/hero.jpg)] bg-center bg-cover">
          <div className="w-full h-full bg-black/50">
            <div className="container px-4 md:px-0 flex flex-col justify-center h-full text-white gap-6">
              <h4>For Rent $70 Per day</h4>
              <h1 className=" text-5xl font-semibold">
                Reserved Now and Get 50% <br />
                Off
              </h1>
              <Link to="/about">
                <div className="bg-primary w-36 py-2 text-center text-black rounded-md">Reserve Now</div>
              </Link>
            </div>
          </div>
        </section>
        <section className="container py-12 w-full flex flex-wrap-reverse items-center px-4 md:px-0">
          <div className="w-full lg:w-1/2">
            <h3 className="text-xl lg:text-2xl text-primary font-semibold">About Us</h3>
            <h1 className="text-2xl lg:text-3xl font-bold">Welcome to Rent Car Service</h1>
            <p className="text-gray-500 font-light text-sm mt-2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum fuga cupiditate, deleniti officia consectetur laboriosam omnis tempora ad amet modi obcaecati velit reprehenderit! Enim, architecto?
            </p>
            <div className="text-gray-500 font-light text-xs lg:text-sm mt-4 flex flex-wrap gap-y-2 ">
              <div className="flex items-center gap-2 w-1/2">
                <FaCircleCheck size={12} color="#FBBF24" />
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
              <div className="flex items-center gap-2 w-1/2">
                <FaCircleCheck size={12} color="#FBBF24" />
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
              <div className="flex items-center gap-2 w-1/2">
                <FaCircleCheck size={12} color="#FBBF24" />
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
              <div className="flex items-center gap-2 w-1/2">
                <FaCircleCheck size={12} color="#FBBF24" />
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <img src="/images/about.png" alt="" className="w-2/3 lg:w-4/5 mx-auto" />
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;
