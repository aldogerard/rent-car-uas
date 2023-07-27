import React, { useEffect } from "react";
import SideBarAdmin from "../../components/Fragments/SideBarAdmin/index.jsx";
import { getDataOrder, updateOrder } from "../../utils/api.js";

import { FaCheck, FaTrashCan } from "react-icons/fa6";
import axios from "axios";

const AdminOrderPage = () => {
  const [order, setOrder] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [filter, isFilter] = React.useState("pending");

  const [status, setStatus] = React.useState("");
  const [message, setMessage] = React.useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    getOrder();
  }, []);

  const getOrder = () => {
    getDataOrder()
      .then((res) => {
        setOrder(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const loadData = () => {
    let count = 0;

    order.map((data, i) => {
      if (data.status !== filter) count++;
    });

    if (count === order.length)
      return (
        <tr className=" ">
          <td colSpan={5} className=" py-6 text-center ">
            Order not found
          </td>
        </tr>
      );

    const handleClickProcess = (id) => {
      const confirm = window.confirm("Are you sure?");
      if (!confirm) return;
      updateOrder(id).then((res) => {
        console.log(res);
        setStatus(res.status);
        setMessage(res.message);
        if (res.status == 200) {
          getOrder();
          loadData();
        }
      });

      setTimeout(() => {
        setStatus("");
        setMessage("");
      }, 3000);
    };

    const handleClickSuccess = async (id) => {
      const confirm = window.confirm("Are you sure?");
      if (!confirm) return;

      const data = await axios.delete(`https://api-rent-car.vercel.app/order/${id}`);
      const res = data.data;
      console.log(res);

      setStatus(res.status);
      setMessage(res.message);
      if (res.status == 200) {
        getOrder();
        loadData();
      }

      setTimeout(() => {
        setStatus("");
        setMessage("");
      }, 3000);
    };

    return order.map(
      (res, i) =>
        res.status === filter && (
          <tr key={res.id} className="text-sm border hover:bg-gray-100">
            <td className="capitalize p-4 ">{res.responseMobil.name}</td>
            <td className=" p-4">{res.responseUser.email}</td>
            <td className=" p-4">{res.responseUser.name}</td>
            <td className=" p-4">{res.tanggalOrder[0]}</td>
            <td className=" p-4">{res.tanggalOrder[res.tanggalOrder.length - 1]}</td>
            <td className=" p-4">
              {filter === "pending" && (
                <div onClick={() => handleClickProcess(res.id)} className="flex gap-2 cursor-pointer items-center justify-center rounded-md w-20 px-2 py-1 bg-rose-400">
                  <h1 className="text-white font-medium">delete</h1>
                  <FaTrashCan size={12} className="text-white" />
                </div>
              )}
              {filter === "proses" && (
                <div onClick={() => handleClickProcess(res.id)} className="flex gap-2 cursor-pointer items-center justify-center rounded-md w-20 px-2 py-1 bg-emerald-400">
                  <h1 className="text-white font-medium">finish</h1>
                  <FaCheck size={12} className="text-white" />
                </div>
              )}
              {filter === "selesai" && (
                <div onClick={() => handleClickSuccess(res.id)} className="flex gap-2 cursor-pointer items-center justify-center rounded-md w-20 px-2 py-1 bg-rose-400">
                  <h1 className="text-white font-medium">delete</h1>
                  <FaTrashCan size={12} className="text-white" />
                </div>
              )}
            </td>
          </tr>
        )
    );
  };

  return (
    <SideBarAdmin>
      <div className="w-full py-2 mb-10 border-b border-black/70">
        <h1 className="text-xl md:text-4xl font-medium">Orders</h1>
      </div>
      <div className="flex py-2 mb-6 gap-6">
        <h1 className={`${filter === "pending" && "font-semibold border-b"} font-light text-center w-24 cursor-pointer duration-200`} onClick={() => isFilter("pending")}>
          Pending
        </h1>
        <h1 className={`${filter === "proses" && "font-semibold border-b"} font-light text-center w-24 cursor-pointer duration-200`} onClick={() => isFilter("proses")}>
          Process
        </h1>
        <h1 className={`${filter === "selesai" && "font-semibold border-b"} font-light text-center w-24 cursor-pointer duration-200`} onClick={() => isFilter("selesai")}>
          Success
        </h1>
      </div>
      {message !== "" && <div className={` transition-all mb-4 duration-500 w-full py-3 font-medium text-lg text-center text-black rounded-md ${status == 200 ? "bg-green-200" : "bg-red-200"} `}>{message}</div>}

      <div className="w-full flex flex-wrap overflow-x-auto rounded-lg shadow-md">
        <table className="w-full bg-gray-50 border-collapse">
          <thead className="">
            <tr className="text-left border bg-gray-200 text-gray-600">
              <th className="p-4">Car</th>
              <th className="p-4">Email</th>
              <th className="p-4">Name</th>
              <th className="p-4">Start Rent</th>
              <th className="p-4">End Rent</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {!isLoading && order != null && loadData()}
            {order == null && (
              <tr className=" ">
                <td colSpan={5} className=" py-6 text-center ">
                  Order not found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </SideBarAdmin>
  );
};

export default AdminOrderPage;
