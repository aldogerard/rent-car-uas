import React, { useEffect } from "react";
import SideBarAdmin from "../../components/Fragments/SideBarAdmin/index.jsx";
import { getDataOrder } from "../../utils/api.js";

import { FaArrowUpRightFromSquare, FaTrashCan } from "react-icons/fa6";

const AdminOrderPage = () => {
  const [order, setOrder] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [filter, isFilter] = React.useState("pending");

  useEffect(() => {
    window.scrollTo(0, 0);
    getDataOrder()
      .then((res) => {
        setOrder(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const loadData = () => {
    let count = 0;

    order.map((data, i) => {
      if (data.status !== filter) count++;
    });

    if (count === order.length)
      return (
        <tr className=" ">
          <td colSpan={5} className=" py-6 text-center ">
            Users not found
          </td>
        </tr>
      );

    return order.map(
      (res, i) =>
        res.status === filter && (
          <tr key={res.id} className="text-sm border hover:bg-gray-100">
            <td className="capitalize p-4 ">{res.responseMobil.name}</td>
            <td className=" p-4">{res.responseUser.name}</td>
            <td className=" p-4">{res.tanggalOrder[0]}</td>
            <td className=" p-4">{res.tanggalOrder[res.tanggalOrder.length - 1]}</td>
            <td className=" p-4">
              <div className="flex items-center gap-4">
                <FaArrowUpRightFromSquare size={16} className="text-emerald-400 cursor-pointer" />
                <FaTrashCan size={16} className=" text-rose-400 cursor-pointer" />
              </div>
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
      <div className="w-full flex flex-wrap overflow-x-auto">
        <table className="w-full bg-gray-50 rounded-lg overflow-hidden shadow-lg border-collapse">
          <thead className="">
            <tr className="text-left border bg-gray-200 text-gray-600">
              <th className="p-4">Car</th>
              <th className="p-4">Name</th>
              <th className="p-4">Start Rent</th>
              <th className="p-4">End Rent</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {!isLoading && loadData()}
            {order.length === 0 && (
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
