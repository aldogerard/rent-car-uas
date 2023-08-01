import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { FaArrowRightLong, FaCircleCheck } from "react-icons/fa6";
import axios from "axios";
import { FormatRupiah } from "@arismun/format-rupiah";

const HomePage = () => {
  const [datas, setDatas] = React.useState({});
  const [auth, setAuth] = React.useState(JSON.parse(sessionStorage.getItem("auth")) || "");

  const getDatas = async () => {
    try {
      const response = await axios.get("https://api-rent-car.vercel.app/product");
      const data = response.data.data;
      setDatas(data != null ? data.sort((a, b) => a.price - b.price) : {});
    } catch (error) {
      setDatas({});
    }
  };

  const loadDatas = () => {
    if (datas.length == null) return <h1 className="text-2xl font-light py-6 mx-auto">Loading ....</h1>;
    return (
      datas != null &&
      datas.map(
        (data, i) =>
          i < 6 && (
            <div key={data.id} className=" w-full md:w-[47%] lg:w-[32%]  flex flex-col items-center rounded-lg overflow-hidden shadow-sm border border-black/20">
              <img src={data.url} alt="" className="w-full object-contain h-full" />
              <div className=" w-full h-full px-4 pb-2 flex flex-col justify-end">
                <h1 className="text-center pb-2 font-medium text-lg">{data.name}</h1>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
                  <div className="flex items-center gap-2 bg-gray-200 rounded-sm p-2 w-[47%]">
                    <FaCircleCheck size={18} color="#FBBF24" />
                    <FormatRupiah value={data.price} />
                  </div>
                  <div className="flex items-center gap-2 bg-gray-200 p-2 rounded-sm w-[47%]">
                    <FaCircleCheck size={18} color="#FBBF24" />
                    <p>{data.type}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-200 p-2 rounded-sm w-[47%]">
                    <FaCircleCheck size={18} color="#FBBF24" />
                    <p>{data.brand}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-200 p-2 rounded-sm w-[47%]">
                    <FaCircleCheck size={18} color="#FBBF24" />
                    <p>{data.year}</p>
                  </div>
                </div>
                <Link
                  to={auth == "" ? `/login` : `/detail/${data.id}`}
                  className="bg-primary mb-2 flex justify-center items-center gap-2 w-full py-2 text-center text-black rounded-md transition-all duration-150 focus:bg-amber-500"
                  type="submit"
                >
                  Rent a car
                  <FaArrowRightLong size={14} />
                </Link>
              </div>
            </div>
          )
      )
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getDatas();
  }, []);

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
              <Link to="/cars">
                <div className="bg-primary w-36 py-2 text-center text-black rounded-md">Reserve Now</div>
              </Link>
            </div>
          </div>
        </section>
        <section className="container py-8 w-full flex flex-wrap-reverse items-center px-4 md:px-0">
          <div className="w-full lg:w-1/2">
            <h3 className="text-xl lg:text-2xl text-primary font-semibold">About Us</h3>
            <h1 className="text-2xl lg:text-3xl font-bold">Welcome to Rent Car Service</h1>
            <p className="text-gray-500 font-light text-sm mt-2">
              We aim to offer car rental services of the highest quality, with flexible duration options, to ensure that our users feel completely comfortable throughout their car rental experience.
            </p>
            <div className="text-gray-500 font-light text-xs lg:text-sm mt-4 flex flex-wrap gap-y-2 ">
              <div className="flex items-center gap-2 w-1/2">
                <FaCircleCheck size={12} color="#FBBF24" />
                <p>Deals For Every Budget</p>
              </div>
              <div className="flex items-center gap-2 w-1/2">
                <FaCircleCheck size={12} color="#FBBF24" />
                <p>Best Price Guaranteed</p>
              </div>
              <div className="flex items-center gap-2 w-1/2">
                <FaCircleCheck size={12} color="#FBBF24" />
                <p>Support 24/7</p>
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
        <section className="container mx-auto w-full flex flex-wrap justify-center items-center bg-red-00 py-8 px-4 md:px-0">
          <div>
            <h1 className="text-2xl lg:text-3xl font-semibold ">
              Our <span className="text-primary font-bold">Cars</span>
            </h1>
          </div>
          <div className="w-full flex flex-wrap justify-center md:justify-between pt-4 mb-6 gap-4">{loadDatas()}</div>
          <Link to={`/cars`} className="bg-primary mb-2 flex justify-center items-center gap-2 w-40 py-2 text-center text-black rounded-md transition-all duration-150 focus:bg-amber-500" type="submit">
            View More...
          </Link>
        </section>
      </main>
    </>
  );
};

export default HomePage;
