import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { FaCircleCheck } from "react-icons/fa6";

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
      <section className="h-[80vh] w-full bg-cover bg-black/80 bg-center relative">
        <img src="/images/hero.jpg" alt="hero" className="w-full h-full object-cover absolute mix-blend-overlay" />
        <div className="container flex flex-col justify-center h-full text-white gap-6">
          <h4>For Rent $70 Per day</h4>
          <h1 className=" text-5xl font-semibold">
            Reserved Now and Get 50% <br />
            Off
          </h1>
          <ThemeProvider theme={theme}>
            <Link to="/about">
              <Button variant="contained" color="primary">
                Reserve Now
              </Button>
            </Link>
          </ThemeProvider>
        </div>
      </section>
      <section className="container py-12 w-full flex items-center">
        <div className="w-1/2">
          <h3 className="text-2xl text-primary font-semibold">About Us</h3>
          <h1 className="text-3xl font-bold">Welcome to Rent Car Service</h1>
          <p className="text-gray-500 font-light text-sm mt-2">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum fuga cupiditate, deleniti officia consectetur laboriosam omnis tempora ad amet modi obcaecati velit reprehenderit! Enim, architecto?
          </p>
          <div className="text-gray-500 font-light text-sm mt-4 flex flex-wrap gap-y-2 ">
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
        <div className="w-1/2">
          <img src="/images/about.png" alt="" className="w-4/5 mx-auto" />
        </div>
      </section>
    </>
  );
};

export default HomePage;
