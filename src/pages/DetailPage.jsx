import axios from "axios";
import React, { useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import Datepicker from "react-tailwindcss-datepicker";

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

  const tanggalOrder = () => {
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

    const response = await axios.post(`https://api-rent-car.vercel.app/order/check/${id}`, {
      tanggalOrder: [value.startDate, value.endDate],
    });
    const datas = response.data;
    console.log(datas);

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
        tanggalOrder: tanggalOrder(),
        totalHarga: totalPrice,
        hargaSewa: datas.price,
      });
      alert(post.data.message);
      window.location.href = "/cars";
      window.location.reload(true);

      console.log(post.data);
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
          <h1 className="font-semibold text-4xl capitalize pb-2">{datas.name}</h1>
          <div className="flex flex-wrap items-center gap-4 capitalize justify-between">
            <div className="flex items-center gap-2 bg-gray-200 rounded-sm p-2 w-[47%]">
              <FaCircleCheck size={18} color="#FBBF24" />
              <p>${datas.price}</p>
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
                  <p>${datas.price}/day</p>
                </div>
              </div>
              <div className="flex gap-2 flex-col w-[47%]">
                <h1 className="font-medium">Total Price</h1>
                <div className="flex items-center gap-2 bg-gray-200 rounded-sm p-2 ">
                  <p>${totalPrice}</p>
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
        <section className="container px-4  py-14">{loadDatas()}</section>
      </main>
    </>
  );
};

export default DetailPage;