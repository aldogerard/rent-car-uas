import React, { useEffect } from "react";
import SideBarAdmin from "../../components/Fragments/SideBarAdmin/index.jsx";
import { getDataUsers } from "../../utils/api.js";

import { FaArrowUpRightFromSquare, FaTrashCan } from "react-icons/fa6";

const AdminUserPage = () => {
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getDataUsers().then((res) => setUsers(res));
  }, []);

  return (
    <SideBarAdmin>
      <div className="w-full py-2 mb-10 border-b border-black/70">
        <h1 className="text-xl md:text-4xl font-medium">Users</h1>
      </div>
      <div className=" flex flex-wrap overflow-x-auto ">
        <table className="w-full  rounded-lg overflow-x-scroll shadow-lg border-collapse">
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
            {users.length !== 0 &&
              users.map((user) => (
                <tr key={user.id} className="text-sm  border hover:bg-gray-100">
                  <td className="capitalize p-4 ">{user.nama}</td>
                  <td className=" p-4">{user.email}</td>
                  <td className=" p-4">{user.alamat}</td>
                  <td className=" p-4">{user.nomor}</td>
                  <td className=" p-4">
                    <div className="flex items-center gap-4">
                      <FaArrowUpRightFromSquare size={16} className="text-emerald-400 cursor-pointer" />
                      <FaTrashCan size={16} className=" text-rose-400 cursor-pointer" />
                    </div>
                  </td>
                </tr>
              ))}

            {users.length === 0 && (
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
