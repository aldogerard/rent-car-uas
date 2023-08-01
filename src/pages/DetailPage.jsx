import axios from "axios";
import React, { useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import Datepicker from "react-tailwindcss-datepicker";

import { IoInformationCircleOutline } from "react-icons/io5";
import { FormatRupiah } from "@arismun/format-rupiah";

const DetailPage = () => {
  const id = useParams().id;
  const idUser = JSON.parse(sessionStorage.getItem("auth")).id;

  const [check, setCheck] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState("");

  const [datas, setDatas] = React.useState({});
  const [value, setValue] = React.useState({
    startDate: null,
    endDate: null,
  });

  const duration = (new Date(value.endDate) - new Date(value.startDate)) / 1000 / 60 / 60 / 24;
  const totalPrice = datas.price * duration;

  const getTanggalOrder = () => {
    const dateSewa = [];
    const hari = 24 * 60 * 60 * 1000;

    for (let i = 0; i <= duration; i++) {
      const date = new Date(value.startDate).toISOString().split("T")[0];

      const date2 = new Date(date).getTime() + hari * i;
      const finalDate = new Date(date2).toISOString().split("T")[0];

      dateSewa.push(finalDate);
    }
    return dateSewa;
  };

  const getData = async () => {
    try {
      const response = await axios.get(`https://api-rent-car.vercel.app/product/${id}`);
      const data = response.data.data;
      setDatas(data);
    } catch (error) {
      setDatas({});
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
  }, []);

  const checkOrder = async () => {
    if (new Date(value.startDate) < new Date() || new Date(value.endDate) < new Date()) {
      setMessage("Date must be rent from tomorrow");
      setStatus(400);
      setTimeout(() => {
        setMessage("");
        setStatus("");
      }, 5000);
      return;
    }

    if (new Date(value.startDate).getTime() === new Date(value.endDate).getTime()) {
      setMessage("Rent must be minimum 1 day");
      setStatus(400);
      setTimeout(() => {
        setMessage("");
        setStatus("");
      }, 5000);
      return;
    }

    const tanggalOrder = getTanggalOrder();

    const response = await axios.post(`https://api-rent-car.vercel.app/order/check/${id}`, {
      tanggalOrder,
    });
    const datas = response.data;

    setMessage(datas.message);
    setStatus(datas.status);

    setTimeout(() => {
      setMessage("");
      setStatus("");
    }, 5000);

    if (datas.status == 200) {
      setCheck(true);
    }
  };

  const orderCar = async () => {
    try {
      const post = await axios.post("https://api-rent-car.vercel.app/order", {
        idUser,
        idMobil: id,
        tanggalOrder: getTanggalOrder(),
        totalHarga: totalPrice,
        hargaSewa: datas.price,
      });
      alert(post.data.message);
      window.location.reload(true);
      window.location.href = "/history";
    } catch (error) {
      alert(error);
    }
  };

  const loadDatas = () => {
    if (datas == null) return <h1>Loading ....</h1>;
    return (
      <div className=" flex flex-wrap justify-center gap-4 ">
        <div className={` transition-all duration-500 w-full py-3 font-medium text-lg text-center text-black rounded-md ${message === "" ? "hidden" : "block"} ${status == 400 ? "bg-red-200" : "bg-green-200"} `} type="submit">
          {message}
        </div>
        <img src={datas.url} alt="" className="w-full lg:w-[47%] -z-20 lg:h-72 object-contain h-52 " />
        <div className="w-full lg:w-[47%] flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-4xl capitalize pb-2">{datas.name}</h1>
            <Link to={`/info/${datas.id}`} className="cursor-pointer">
              <IoInformationCircleOutline size={28} />
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-4 capitalize justify-between">
            <div className="flex items-center gap-2 bg-gray-200 rounded-sm p-2 w-[47%]">
              <FaCircleCheck size={18} color="#FBBF24" />
              <FormatRupiah value={datas.price} />
            </div>
            <div className="flex items-center gap-2 bg-gray-200 rounded-sm p-2 w-[47%]">
              <FaCircleCheck size={18} color="#FBBF24" />
              <p>{datas.type}</p>
            </div>
            <div className="flex items-center gap-2 bg-gray-200 rounded-sm p-2 w-[47%]">
              <FaCircleCheck size={18} color="#FBBF24" />
              <p>{datas.year}</p>
            </div>
            <div className="flex items-center gap-2 bg-gray-200 rounded-sm p-2 w-[47%]">
              <FaCircleCheck size={18} color="#FBBF24" />
              <p>{datas.brand}</p>
            </div>
            {/* <div className="flex items-center gap-2 bg-white border border-black/20 w-full rounded-sm p-2">
              <input type="date" className="w-full px-2 focus:outline-none text-sm text-black/70" />
            </div>
            <div className="flex items-center gap-2 bg-white border border-black/20 w-full rounded-sm p-2">
              <input type="date" className="w-full px-2 focus:outline-none text-sm text-black/70" />
            </div> */}
          </div>
          {!check && (
            <>
              <div className="border border-black/20 rounded-sm mt-2 cursor-pointer w-full">
                <Datepicker value={value} onChange={(e) => setValue(e)} primaryColor="amber" className="w-full" />
              </div>
              <button onClick={checkOrder} className="bg-primary  mt-2 mb-2 flex justify-center items-center gap-2 w-full py-2 text-center text-black rounded-sm transition-all duration-150 focus:bg-amber-500" type="submit">
                check order
              </button>
            </>
          )}

          {check && (
            <div className="flex flex-wrap justify-between gap-4 mt-6">
              <div className="flex gap-2 flex-col w-[47%]">
                <h1 className="font-medium">Start Order</h1>
                <div className="flex items-center gap-2 bg-gray-200 rounded-sm p-2 ">
                  <p>{value.startDate}</p>
                </div>
              </div>
              <div className="flex gap-2 flex-col w-[47%]">
                <h1 className="font-medium">End Order</h1>
                <div className="flex items-center gap-2 bg-gray-200 rounded-sm p-2 ">
                  <p>{value.endDate}</p>
                </div>
              </div>
              <div className="flex gap-2 flex-col w-[47%]">
                <h1 className="font-medium">Duration</h1>
                <div className="flex items-center gap-2 bg-gray-200 rounded-sm p-2 ">
                  <p>{duration} day</p>
                </div>
              </div>
              <div className="flex gap-2 flex-col w-[47%]">
                <h1 className="font-medium">Price</h1>
                <div className="flex items-center gap-2 bg-gray-200 rounded-sm p-2 ">
                  <FormatRupiah value={datas.price} />
                </div>
              </div>
              <div className="flex gap-2 flex-col w-[47%]">
                <h1 className="font-medium">Total Price</h1>
                <div className="flex items-center gap-2 bg-gray-200 rounded-sm p-2 ">
                  <FormatRupiah value={totalPrice} />
                </div>
              </div>
              <button onClick={orderCar} className="bg-primary  mt-2 mb-2 flex justify-center items-center gap-2 w-full py-2 text-center text-black rounded-sm transition-all duration-150 focus:bg-amber-500" type="submit">
                Order Car
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <main className="pt-[50px] md:pt-[150px] lg:pt-[130px] -z-50">
        <section className="container px-4 md:px-0 py-14">{loadDatas()}</section>
      </main>
    </>
  );
};

export default DetailPage;
