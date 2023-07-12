import React, { useEffect } from "react";

import { FaCarRear, FaEarthAmericas, FaClock, FaUserLarge, FaPhone } from "react-icons/fa6";

import { Link } from "react-router-dom";

const index = () => {
  const [username, setUsername] = React.useState("aldogerard@gmail.com");

  useEffect(() => {
    if (import.meta.env.VITE_REACT_APP_TOKEN === sessionStorage.getItem("token")) return setUsername(sessionStorage.getItem("username"));
    return setUsername("");
  }, []);
  return (
    <>
      <header className="w-full bg-white z-[99999px] relative ">
        <div className="container flex justify-between py-6">
          <div className="flex flex-row jc-center items-center gap-2">
            <FaCarRear size={25} />
            <h1 className="leading-none font-semibold  text-lg">
              Rent Car <br /> Service
            </h1>
          </div>
          <div className="flex flex-row jc-center items-center gap-2">
            <FaEarthAmericas size={25} />
            <div>
              <h1 className="leading-tight font-medium">Indonesia</h1>
              <h3 className="leading-tight font-normal">Surabaya City</h3>
            </div>
          </div>
          <div className="flex flex-row jc-center items-center gap-2">
            <FaClock size={25} />
            <div>
              <h1 className="leading-tight font-medium">Monday to Sunday</h1>
              <h3 className="leading-tight font-normal">10AM - 10PM</h3>
            </div>
          </div>
          <div className="flex flex-row jc-center items-center gap-2">
            <FaPhone size={25} />
            <div>
              <h1 className="leading-tight font-medium">Call</h1>
              <h3 className="leading-tight font-normal">+628123456789</h3>
            </div>
          </div>
        </div>
        <nav className="bg-primary">
          <div className="container flex flex-row justify-between">
            <ul className="flex flex-row gap-10 py-3 text-sm">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/about">Cars</Link>
              </li>
              <li>
                <Link to="/about">Contact</Link>
              </li>
            </ul>
            <div className="flex flex-row jc-center items-center gap-2">
              {username === "" ? (
                <Link to="/login" className="flex flex-row items-center gap-1 text-sm">
                  <FaUserLarge size={12} />
                  login
                </Link>
              ) : (
                <Link to="/about" className="flex flex-row items-center gap-1 text-sm">
                  <FaUserLarge size={12} />
                  {username}
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default index;
