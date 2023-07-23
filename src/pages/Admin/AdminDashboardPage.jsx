import React, { useEffect } from "react";
import SideBarAdmin from "../../components/Fragments/SideBarAdmin/index.jsx";
import { FaBasketShopping, FaCarRear, FaEnvelopeOpenText, FaMoneyBillTransfer, FaUsers } from "react-icons/fa6";
import { IoTimer } from "react-icons/io5";
import { getDataCars, getDataMessage, getDataOrder, getDataUsers } from "../../utils/api.js";
import { Link } from "react-router-dom";

const AdminDashboardPage = () => {
  const [users, setUsers] = React.useState([]);
  const [cars, setCars] = React.useState([]);
  const [order, setOrder] = React.useState([]);
  const [orderProcess, setOrderProcess] = React.useState([]);
  const [orderPending, setOrderPending] = React.useState([]);
  const [message, setMessage] = React.useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getDataUsers().then((res) => setUsers(res) || []);
    getDataCars().then((res) => setCars(res) || []);
    getDataOrder().then((res) => {
      setOrder(res || []);
      setOrderProcess((res) => res.status === "proses" || []);
      setOrderPending((res) => res.status === "pending" || []);
    });
    getDataMessage().then((res) => setMessage(res || []));
  }, []);

  return (
    <SideBarAdmin>
      <div className="w-full py-2 mb-10 border-b border-black/70">
        <h1 className="text-xl md:text-4xl font-medium">Dashboard</h1>
      </div>
      <div className="w-full flex flex-wrap justify-center md:justify-between gap-5 lg:gap-4">
        <Link to="/admin/cars" className="border flex items-center w-full sm:w-[48%] lg:w-[32%] border-black/20 gap-4 rounded-lg shadow-sm hover:shadow-md duration-300 cursor-pointer py-4 px-4">
          <div className="p-3 mx-1 bg-dark rounded-full">
            <FaCarRear size={36} color="white" />
          </div>
          <div>
            <h1 className="font-light text-base">Car Available</h1>
            <h2 className="text-4xl font-semibold">{cars.length || 0}</h2>
          </div>
        </Link>
        <Link to="/admin/users" className=" border flex items-center w-full sm:w-[48%] lg:w-[32%] border-black/20 gap-4 rounded-lg shadow-sm hover:shadow-md duration-300 cursor-pointer py-4 px-4">
          <div className="p-3 mx-1 bg-dark rounded-full">
            <FaUsers size={32} color="white" />
          </div>
          <div>
            <h1 className="font-light text-sm">Register Users</h1>
            <h2 className="text-3xl font-semibold">{users.length || 0}</h2>
          </div>
        </Link>
        <Link to="/admin/order" className=" border flex items-center w-full sm:w-[48%] lg:w-[32%] border-black/20 gap-4 rounded-lg shadow-sm hover:shadow-md duration-300 cursor-pointer py-4 px-4">
          <div className="p-3 mx-1 bg-dark rounded-full">
            <FaBasketShopping size={32} color="white" />
          </div>
          <div>
            <h1 className="font-light text-sm">Rent Orders</h1>
            <h2 className="text-3xl font-semibold">{order.length || 0}</h2>
          </div>
        </Link>
        <Link to="/admin/order" className=" border flex items-center w-full sm:w-[48%] lg:w-[32%] border-black/20 gap-4 rounded-lg shadow-sm hover:shadow-md duration-300 cursor-pointer py-4 px-4">
          <div className="p-3 mx-1 bg-dark rounded-full">
            <FaMoneyBillTransfer size={32} color="white" />
          </div>
          <div>
            <h1 className="font-light text-sm">Waiting Payment</h1>
            <h2 className="text-3xl font-semibold">{orderPending.length || 0}</h2>
          </div>
        </Link>
        <Link to="/admin/order" className=" border flex items-center w-full sm:w-[48%] lg:w-[32%] border-black/20 gap-4 rounded-lg shadow-sm hover:shadow-md duration-300 cursor-pointer py-4 px-4">
          <div className="p-3 mx-1 bg-dark rounded-full">
            <IoTimer size={32} color="white" />
          </div>
          <div>
            <h1 className="font-light text-sm">On Process</h1>
            <h2 className="text-3xl font-semibold">{orderProcess.length || 0}</h2>
          </div>
        </Link>
        <Link to="/admin/message" className=" border flex items-center w-full sm:w-[48%] lg:w-[32%] border-black/20 gap-4 rounded-lg shadow-sm hover:shadow-md duration-300 cursor-pointer py-4 px-4">
          <div className="p-3 mx-1 bg-dark rounded-full">
            <FaEnvelopeOpenText size={32} color="white" />
          </div>
          <div>
            <h1 className="font-light text-sm">Message</h1>
            <h2 className="text-3xl font-semibold">{message.length || 0}</h2>
          </div>
        </Link>
      </div>
    </SideBarAdmin>
  );
};

export default AdminDashboardPage;
