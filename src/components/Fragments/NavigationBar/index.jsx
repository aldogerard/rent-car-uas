import React, { useEffect } from "react";

import { FaCarRear, FaEarthAmericas, FaClock, FaUserLarge, FaPhone, FaBars } from "react-icons/fa6";
import { IoMenuSharp } from "react-icons/io5";

import { Link } from "react-router-dom";

const index = () => {
  const [datas, setDatas] = React.useState(JSON.parse(sessionStorage.getItem("auth")) || "");
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    setDatas(JSON.parse(sessionStorage.getItem("auth")));
    if (import.meta.env.VITE_REACT_APP_TOKEN === datas.token) return setDatas(JSON.parse(sessionStorage.getItem("auth")));
    return setDatas("");
  }, [sessionStorage.getItem("auth")]);

  const logout = () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (!confirm) return;

    sessionStorage.clear();

    window.location.reload(true);
    window.location.href = "/";
  };

  return (
    <>
      <header className="w-full bg-white z-[99999px]  fixed border-b border-black">
        <div className="hidden container md:flex justify-between py-6">
          <div className="flex flex-row jc-center items-center gap-2">
            <FaCarRear size={25} />
            <h1 className="lg:leading-none font-semibold text-sm lg:text-lg">
              Rent Car <br /> Service
            </h1>
          </div>
          <div className="flex flex-row jc-center items-center gap-2">
            <FaEarthAmericas size={25} />
            <div>
              <h1 className="lg:leading-tight font-medium text-sm lg:text-base">Indonesia</h1>
              <h3 className="lg:leading-tight font-normal text-sm lg:text-base">Surabaya City</h3>
            </div>
          </div>
          <div className="flex flex-row jc-center items-center gap-2">
            <FaClock size={25} />
            <div>
              <h1 className="lg:leading-tight font-medium text-sm lg:text-base">Monday to Sunday</h1>
              <h3 className="lg:leading-tight font-normal text-sm lg:text-base">10AM - 10PM</h3>
            </div>
          </div>
          <div className="flex flex-row jc-center items-center gap-2">
            <FaPhone size={25} />
            <div>
              <h1 className="lg:leading-tight font-medium text-sm lg:text-base">Call</h1>
              <h3 className="lg:leading-tight font-normal text-sm lg:text-base">+628123456789</h3>
            </div>
          </div>
        </div>
        <div className=" bg-primary">
          <nav className=" py-4 lg:py-3 container px-4 md:px-0 z-50 flex flex-row justify-between">
            <ul
              className={`justify-between absolute lg:flex z-[1500px] transition-all lg:px-0 bg-primary translate-y-8 lg:translate-y-0 w-full lg:w-0 flex-col lg:relative lg:flex-row gap-10 lg:h-full h-screen py-3 lg:py-0 text-lg lg:text-sm duration-500 text-center lg:translate-x-0 lg:opacity-100 ${
                isOpen ? "opacity-100 translate-x-[-22%]" : "opacity-0 translate-x-[-120%]"
              }`}
            >
              <li className="py-6 pt-[25%] md:pt-[10%]  lg:py-0 lg:pt-0">
                <Link to="/">Home</Link>
              </li>
              <li className="py-6 lg:py-0 lg:pt-0">
                <Link to="/about">About</Link>
              </li>
              <li className="py-6 lg:py-0 lg:pt-0">
                <Link to="/cars">Cars</Link>
              </li>
              {datas != "" && (
                <li className="py-6 lg:py-0 lg:pt-0">
                  <Link to="/history">History</Link>
                </li>
              )}
              <li className="py-6 lg:py-0 lg:pt-0">
                <Link to="/contact">Contact</Link>
              </li>
            </ul>

            <div className="lg:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
              <IoMenuSharp size={30} />
            </div>

            <div className="flex flex-row jc-center items-center gap-2">
              {datas == "" ? (
                <Link to="/login" className="flex flex-row items-center gap-1 text-sm">
                  <FaUserLarge size={12} />
                  login
                </Link>
              ) : (
                <div className="flex flex-row items-center gap-2 h-0">
                  <h1 className="py-6 text-sm lg:py-0 lg:pt-0 cursor-pointer" onClick={logout}>
                    Logout
                  </h1>
                  |
                  <Link to="/about" className="flex flex-row items-center gap-1 text-sm">
                    {/* <FaUserLarge size={12} /> */}
                    {datas.email}
                  </Link>
                </div>
              )}
            </div>

            {/* <div className="container flex flex-row justify-between "></div> */}
          </nav>
        </div>
      </header>
    </>
  );
};

export default index;
