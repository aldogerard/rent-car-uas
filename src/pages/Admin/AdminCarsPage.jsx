import React, { useEffect } from "react";
import SideBarAdmin from "../../components/Fragments/SideBarAdmin/index.jsx";
import { getDataCars, getDataCarsById } from "../../utils/api.js";

import { FaArrowUpRightFromSquare, FaTrashCan } from "react-icons/fa6";
import axios from "axios";
import { Link } from "react-router-dom";
import { FormatRupiah } from "@arismun/format-rupiah";

const AdminCarsPage = () => {
  const [cars, setCars] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [status, setStatus] = React.useState("");
  const [message, setMessage] = React.useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    getCars();
  }, []);

  const getCars = () => {
    getDataCars()
      .then((res) => {
        // setCars(res);
        setCars(res != null ? res.sort((a, b) => a.price - b.price) : {});
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteData = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this car?");
    if (!confirm) return;
    const data = await axios.delete(
      `https://api-rent-car.vercel.app/product/${id}`
    );
    setStatus(data.data.status);
    setMessage(data.data.message);

    if (data.data.status == 200) {
      getCars();
    }

    setTimeout(() => {
      setStatus("");
      setMessage("");
    }, 3000);
  };

  const loadData = () => {
    return cars.map((res, i) => (
      <tr key={res.id} className="text-sm border hover:bg-gray-100">
        <td className="capitalize p-4 ">
          <img
            src={res.imageUrl}
            alt=""
            className="w-[7rem] h-[5rem] object-contain"
          />
        </td>
        <td className=" p-4">{res.name}</td>
        <td className=" p-4">{res.brand}</td>
        <td className=" p-4">{res.type}</td>
        <td className=" p-4">{res.year}</td>
        <td className=" p-4">
          <FormatRupiah value={res.price} />
        </td>
        <td className=" p-4">
          <div className="flex items-center gap-4">
            <Link to={`/admin/cars/${res.id}`}>
              <FaArrowUpRightFromSquare
                size={16}
                className="text-emerald-400 cursor-pointer"
              />
            </Link>
            <FaTrashCan
              size={16}
              className=" text-rose-400 cursor-pointer"
              onClick={() => deleteData(res.id)}
            />
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <SideBarAdmin>
      <div className="w-full py-2 flex justify-between mb-10 border-b border-black/70">
        <h1 className="text-xl md:text-4xl font-medium">Cars</h1>
        <Link to="/admin/cars/add" className=" bg-sky-300 px-6 py-2 rounded-lg">
          <h1 className="font-medium">Add Cars</h1>
        </Link>
      </div>
      {message !== "" && (
        <div
          className={` transition-all mb-4 duration-500 w-full py-3 font-medium text-lg text-center text-black rounded-md ${
            status == 200 ? "bg-green-200" : "bg-red-200"
          } `}
        >
          {message}
        </div>
      )}
      <div className="w-full flex flex-wrap overflow-x-auto rounded-lg shadow-md">
        <table className="w-full bg-gray-50 overflow-x-scroll border-collapse">
          <thead className="">
            <tr className="text-left border bg-gray-200 text-gray-600">
              <th className="p-4">Car</th>
              <th className="p-4">Name</th>
              <th className="p-4">Brand</th>
              <th className="p-4">Type</th>
              <th className="p-4">Year</th>
              <th className="p-4">Price</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {!isLoading && loadData()}
            {cars == null && (
              <tr className=" ">
                <td colSpan={5} className=" py-6 text-center ">
                  Cars not found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </SideBarAdmin>
  );
};

export default AdminCarsPage;
