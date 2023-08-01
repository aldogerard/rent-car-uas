import { FormatRupiah } from "@arismun/format-rupiah";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PaymentPage = () => {
  const { id } = useParams();

  const [datas, setDatas] = useState({});
  const [loading, setIsLoading] = useState(true);

  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState("");

  const [statusPayment, setStatusPayment] = useState("");

  const getData = async () => {
    const response = await axios.get(`https://api-rent-car.vercel.app/order/${id}`);
    const data = response.data.data;

    setStatusPayment(data.status);
    setDatas(data);
    setIsLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const moneyPayment = e.target.moneyPayment.value;

    if (moneyPayment < datas.totalHarga) {
      setMessage("Your money is not enough");
      setStatus(400);
      return setTimeout(() => {
        setMessage("");
        setStatus("");
      }, 3000);
    }

    const post = await axios.patch(`https://api-rent-car.vercel.app/order/payment/${id}`, {
      uangPembayaran: moneyPayment,
      totalHarga: datas.totalHarga,
    });
    const response = post.data;

    setMessage(response.message);
    setStatus(response.status);
    return setTimeout(() => {
      setMessage("");
      setStatus("");
      window.location.href = "/history";
    }, 1000);
  };

  return (
    <main className="pt-[50px] md:pt-[150px] lg:pt-[130px] -z-50">
      <section className="container px-4 md:px-0 py-14">
        {statusPayment == "proses" && <h1 className="text-3xl font-semibold text-left mb-6">Payment</h1>}
        {loading && <h1>Loading....</h1>}
        {datas == null && <h1>Payment not found</h1>}
        {loading === false && datas != null && statusPayment === "pending" ? (
          <div className="flex flex-col lg:flex-row lg:items-center justify-center w-full py-2 pb-4">
            <img src={datas.responseMobil.url} alt="pict car" className="w-full lg:w-1/2 object-contain h-52" />
            <div className="flex flex-col lg:w-1/2">
              {message !== "" && (
                <div className={` transition-all duration-500 mb-2 w-full py-3 text-center text-black rounded-md ${message === "" ? "hidden" : "block"} ${status !== 200 ? "bg-red-200" : "bg-green-200"} `} type="submit">
                  {message}
                </div>
              )}
              <h1 className="text-xl md:text-2xl font-medium pb-2">{datas.responseMobil.name}</h1>
              <div className="flex flex-wrap justify-between items-center gap-4 ">
                <div className="flex flex-col w-[47%]">
                  <h1 className="text-sm font-normal">Start Order</h1>
                  <div className="flex items-center bg-gray-200 rounded-sm p-2">
                    <p>{datas.tanggalOrder[0]}</p>
                  </div>
                </div>
                <div className="flex flex-col w-[47%]">
                  <h1 className="text-sm font-normal">End Order</h1>
                  <div className="flex items-center bg-gray-200 rounded-sm p-2">
                    <p>{datas.tanggalOrder[datas.tanggalOrder.length - 1]}</p>
                  </div>
                </div>
                <div className="flex flex-col w-[47%]">
                  <h1 className="text-sm font-normal">Total Price</h1>
                  <div className="flex items-center bg-gray-200 rounded-sm p-2">
                    <FormatRupiah value={datas.hargaSewa} />
                  </div>
                </div>
                <div className="flex flex-col w-[47%]">
                  <h1 className="text-sm font-normal">Total Price</h1>
                  <div className="flex items-center gap-2 bg-gray-200 rounded-sm p-2">
                    <FormatRupiah value={datas.totalHarga} />
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                  <input
                    type="number"
                    id="moneyPayment"
                    name="moneyPayment"
                    required
                    placeholder="input your money here"
                    className="w-full placeholder:text-base mt-1 px-4 py-3 focus:outline-none shadow-sm border border-black/30 rounded-md text-base"
                    autoComplete="off"
                  />
                  <button className="bg-primary font-medium w-full py-3 px-4 text-center text-black rounded-md transition-all duration-150 focus:bg-amber-500" type="submit">
                    pay
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="text-2xl lg:text-4xl py-12 text-center font-semibold">Payment already done</h1>
        )}
      </section>
    </main>
  );
};

export default PaymentPage;
