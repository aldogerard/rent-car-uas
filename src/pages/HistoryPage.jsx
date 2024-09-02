import { FormatRupiah } from "@arismun/format-rupiah";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const HistoryPage = () => {
  const { id } = JSON.parse(sessionStorage.getItem("auth"));
  const [datas, setDatas] = useState([]);

  const [filter, setFilter] = useState("pending");

  const [loading, setIsLoading] = useState(true);

  const [limit, setLimit] = useState([]);

  const getData = async () => {
    const datas = await axios.get(
      `https://api-rent-car.vercel.app/order/users/${id}`
    );
    const response = datas.data.data;
    setDatas(
      response != null
        ? response.sort(
            (a, b) =>
              new Date(a.tanggalOrder[0]).getTime() -
              new Date(b.tanggalOrder[0]).getTime()
          )
        : []
    );

    setIsLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
    // time();
  }, []);

  // const time = () => {
  //   let limitTime = 1000 * 60 * 0.2;

  //   let curTime = new Date().getTime();

  //   let maxTime = new Date(curTime + limitTime).getTime();

  //   const countDown = setInterval(() => {
  //     let nowTime = new Date().getTime();
  //     let selisih = maxTime - nowTime;

  //     let minutes = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60));
  //     let seconds = Math.floor((selisih % (1000 * 60)) / 1000);

  //     setLimit(minutes + ":" + seconds);

  //     if (selisih < 0) {
  //       clearInterval(countDown);
  //       setLimit("00:00");
  //     }
  //   }, 1000);
  // };

  const loadDatas = () => {
    let count = 0;

    if (datas == [])
      return (
        <h1 className="text-2xl text-center  w-full md:text-3xl font-semibold pt-6 lg:pt-20 lg:pb-[3.4rem]">
          Loading...
        </h1>
      );
    if (datas == null)
      return (
        <h1 className="text-2xl text-center  w-full md:text-3xl font-semibold pt-6 lg:pt-20 lg:pb-[3.4rem]">
          Data Not Found
        </h1>
      );
    datas.map((data, i) => {
      if (data.status !== filter) count++;
    });
    if (count === datas.length)
      return (
        <h1 className="text-2xl text-center  w-full md:text-3xl font-semibold pt-6 lg:pt-20 lg:pb-[3.4rem]">
          Data Not Found
        </h1>
      );
    console.log(datas);

    return datas.map(
      (data, i) =>
        data.status === filter && (
          <div
            key={data.id}
            className="flex flex-col lg:flex-row border rounded-md shadow-sm lg:items-center justify-center w-full py-2 pb-4"
          >
            <img
              src={data.responseMobil.url}
              alt="pict car"
              className="w-full lg:w-1/2 object-contain h-52"
            />
            <div className="px-4 lg:w-1/2">
              <h1 className="text-xl md:text-2xl font-medium pb-2">
                {data.responseMobil.name}
              </h1>
              {/* {filter === "pending" && <h1 className="text-base text-rose-500 pb-2">{limit}</h1>} */}
              <div className="flex flex-wrap justify-between items-center gap-4 ">
                <div className="flex flex-col w-[47%]">
                  <h1 className="text-sm font-normal">Start Order</h1>
                  <div className="flex items-center bg-gray-200 rounded-sm p-2">
                    <p>{data.tanggalOrder[0]}</p>
                  </div>
                </div>
                <div className="flex flex-col w-[47%]">
                  <h1 className="text-sm font-normal">End Order</h1>
                  <div className="flex items-center bg-gray-200 rounded-sm p-2">
                    <p>{data.tanggalOrder[data.tanggalOrder.length - 1]}</p>
                  </div>
                </div>
                <div className="flex flex-col w-[47%]">
                  <h1 className="text-sm font-normal">Total Price</h1>
                  <div className="flex items-center bg-gray-200 rounded-sm p-2">
                    <FormatRupiah value={data.hargaSewa} />
                  </div>
                </div>
                <div className="flex flex-col w-[47%]">
                  <h1 className="text-sm font-normal">Total Price</h1>
                  <div className="flex items-center gap-2 bg-gray-200 rounded-sm p-2">
                    <FormatRupiah value={data.totalHarga} />
                  </div>
                </div>
                {data.status === "pending" && (
                  <Link
                    to={`/payment/${data.id}`}
                    className="bg-primary  mt-2 mb-2 flex justify-center items-center gap-2 w-full py-2 text-center text-black rounded-sm transition-all duration-150 focus:bg-amber-500"
                    type="submit"
                  >
                    Pay order
                    <FaArrowRightLong size={14} />
                  </Link>
                )}
                {data.status === "selesai" && (
                  <Link
                    to={`/detail/${data.idMobil}`}
                    className="bg-primary  mt-2 mb-2 flex justify-center items-center gap-2 w-full py-2 text-center text-black rounded-sm transition-all duration-150 focus:bg-amber-500"
                    type="submit"
                  >
                    Order again
                    <FaArrowRightLong size={14} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        )
    );
  };

  return (
    <>
      <main className="pt-[50px] md:pt-[150px] lg:pt-[130px] -z-50 ">
        <section className="container py-8 w-full flex flex-wrap items-center px-4 md:px-0">
          <div className="flex justify-center w-full pb-4">
            <h1 className="text-2xl lg:text-4xl font-semibold ">
              My <span className="text-primary font-bold">History</span>
            </h1>
          </div>
          <div className="m-2 flex w-full max-w-min  mx-auto gap-2 rounded-lg bg-amber-300 p-[6px] ">
            <button
              className={`btn ${filter === "pending" && "bg-white "}`}
              onClick={() => setFilter("pending")}
            >
              Pending
            </button>
            <button
              className={`btn  ${filter === "proses" && "bg-white "}`}
              onClick={() => setFilter("proses")}
            >
              Process
            </button>
            <button
              className={`btn  ${filter === "selesai" && "bg-white "}`}
              onClick={() => setFilter("selesai")}
            >
              Finish
            </button>
          </div>
          <div className="w-full flex flex-wrap justify-center md:justify-between pt-4 mb-6 gap-4">
            {loading ? <h1>Loading ....</h1> : loadDatas()}
          </div>
        </section>
      </main>
    </>
  );
};

export default HistoryPage;
