import React, { useEffect } from "react";
import SideBarAdmin from "../../components/Fragments/SideBarAdmin/index.jsx";
import { getDataUsers } from "../../utils/api.js";

import { FaArrowUpRightFromSquare, FaTrashCan } from "react-icons/fa6";
import axios from "axios";

const AdminUserPage = () => {
  const [users, setUsers] = React.useState([]);

  const [status, setStatus] = React.useState("");
  const [message, setMessage] = React.useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    getDataUsers().then((res) => setUsers(res) || []);
  }, []);

  const handleClick = async (id) => {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) return;

    const data = await axios.delete(`https://api-rent-car.vercel.app/users/${id}`);
    const res = data.data;

    setStatus(res.status);
    setMessage(res.message);
    if (res.status == 200) {
      getDataUsers().then((res) => setUsers(res) || []);
    }

    setTimeout(() => {
      setStatus("");
      setMessage("");
    }, 3000);
  };

  return (
    <SideBarAdmin>
      <div className="w-full py-2 mb-10 border-b border-black/70">
        <h1 className="text-xl md:text-4xl font-medium">Users</h1>
      </div>
      {message !== "" && <div className={` transition-all mb-4 duration-500 w-full py-3 font-medium text-lg text-center text-black rounded-md ${status == 200 ? "bg-green-200" : "bg-red-200"} `}>{message}</div>}

      <div className=" flex flex-wrap overflow-x-auto  rounded-lg shadow-md">
        <table className="w-full bg-gray-50 overflow-x-scroll border-collapse">
          <thead className="">
            <tr className="text-left border bg-gray-200 text-gray-600">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Address</th>
              <th className="p-4">Phone Number</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {users != null &&
              users.map((user) => (
                <tr key={user.id} className="text-sm  border hover:bg-gray-100">
                  <td className="capitalize p-4 ">{user.nama}</td>
                  <td className=" p-4">{user.email}</td>
                  <td className=" p-4">{user.alamat}</td>
                  <td className=" p-4">{user.nomor}</td>
                  <td className=" p-4">
                    <div onClick={() => handleClick(user.id)} className="flex gap-2 cursor-pointer items-center justify-center rounded-md w-20 px-2 py-1 bg-rose-400">
                      <h1 className="text-white font-medium">delete</h1>
                      <FaTrashCan size={12} className="text-white" />
                    </div>
                  </td>
                </tr>
              ))}

            {users == null && (
              <tr className=" ">
                <td colSpan={5} className=" py-6 text-center ">
                  Users not found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </SideBarAdmin>
  );
};

export default AdminUserPage;
