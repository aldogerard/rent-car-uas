import axios from "axios";
import React, { useEffect } from "react";

const EditProfilePage = () => {
  const [auth, setAuth] = React.useState(JSON.parse(sessionStorage.getItem("auth")) || "");

  const [newData, setNewData] = React.useState({});

  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState("");

  const { id } = auth;

  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
  }, []);

  const getData = async () => {
    const datas = await axios.get(`https://api-rent-car.vercel.app/users/${id}`);
    const response = datas.data.data[0];
    setNewData(response);

    setNewData((state) => ({ ...state, password: "", newPassword: "", confirmPassword: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newData.newPassword !== newData.confirmPassword) {
      setMessage("Password is not match");
      setStatus(400);
      return setTimeout(() => {
        setMessage("");
        setStatus("");
      }, 3000);
    }

    const patch = await axios.patch(`https://api-rent-car.vercel.app/users/${id}`, newData);

    const response = patch.data;

    setMessage(response.message);
    setStatus(response.status);
    setTimeout(
      () => {
        setMessage("");
        setStatus("");
      },
      response.status === 200 ? 1000 : 3000
    );

    if (response.status == 200) return (window.location.href = "/profile");
  };

  return (
    <>
      <main className="pt-[50px] md:pt-[150px] lg:pt-[130px] -z-50">
        <div className="container px-4 md:px-0 flex flex-col items-center py-14 justify-center h-full text-black gap-6">
          {newData != {} && (
            <>
              <div className="w-36 mb-2">
                <img src="/images/man.png" alt="" className="object contain object-center mx-auto" />
              </div>

              <div className="flex items-center w-full justify-center gap-2 font-light text-gray-900">
                {newData != {} && (
                  <form onSubmit={handleSubmit} className="flex flex-wrap md:max-w-lg justify-between gap-y-3 w-full lg:max-w-5xl">
                    <div className={` transition-all duration-500 w-full py-3 text-center text-black rounded-md ${message === "" ? "hidden" : "block"} ${status != 200 ? "bg-red-200" : "bg-green-200"} `} type="submit">
                      {message}
                    </div>

                    <div className="w-full lg:w-[48%]">
                      <label htmlFor="nama" className="font-medium text-md -mb-4">
                        Name
                      </label>
                      <input
                        id="nama"
                        name="nama"
                        required
                        value={newData.nama}
                        placeholder="Nama*"
                        className="w-full placeholder:text-base px-3 py-4 focus:outline-none shadow-sm border border-black/30 rounded-md text-base"
                        autoComplete="off"
                        type="text"
                        onChange={(e) => setNewData({ ...newData, nama: e.target.value })}
                      />
                    </div>

                    <div className="w-full lg:w-[48%]">
                      <label htmlFor="nomor" className="font-medium text-md -mb-4">
                        Phone Number
                      </label>
                      <input
                        id="nomor"
                        name="nomor"
                        required
                        value={newData.nomor}
                        placeholder="nomor*"
                        className="w-full placeholder:text-base px-3 py-4 focus:outline-none shadow-sm border border-black/30 rounded-md text-base"
                        autoComplete="off"
                        type="number"
                        onChange={(e) => setNewData({ ...newData, nomor: e.target.value })}
                      />
                    </div>

                    <div className="w-full lg:w-[48%]">
                      <label htmlFor="alamat" className="font-medium text-md -mb-4">
                        Address
                      </label>
                      <input
                        id="alamat"
                        name="alamat"
                        required
                        value={newData.alamat}
                        placeholder="alamat*"
                        className="w-full placeholder:text-base px-3 py-4 focus:outline-none shadow-sm border border-black/30 rounded-md text-base"
                        autoComplete="off"
                        type="text"
                        onChange={(e) => setNewData({ ...newData, alamat: e.target.value })}
                      />
                    </div>

                    <div className="w-full lg:w-[48%]">
                      <label htmlFor="password" className="font-medium text-md -mb-4">
                        Current Password*
                      </label>
                      <input
                        id="password"
                        name="password"
                        required
                        placeholder="Current Password*"
                        className="w-full placeholder:text-base px-3 py-4 focus:outline-none shadow-sm border border-black/30 rounded-md text-base"
                        autoComplete="off"
                        value={newData.password}
                        type="password"
                        onChange={(e) => setNewData({ ...newData, password: e.target.value })}
                      />
                    </div>

                    <div className="w-full lg:w-[48%]">
                      <label htmlFor="newPassword" className="font-medium text-md -mb-4">
                        New Password
                      </label>
                      <input
                        id="newPassword"
                        name="newPassword"
                        placeholder="New Password"
                        className="w-full placeholder:text-base px-3 py-4 focus:outline-none shadow-sm border border-black/30 rounded-md text-base"
                        autoComplete="off"
                        value={newData.newPassword}
                        type="password"
                        onChange={(e) => setNewData({ ...newData, newPassword: e.target.value })}
                      />
                    </div>

                    <div className="w-full lg:w-[48%]">
                      <label htmlFor="confirmPassword" className="font-medium text-md -mb-4">
                        Confirm Password
                      </label>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="w-full placeholder:text-base px-3 py-4 focus:outline-none shadow-sm border border-black/30 rounded-md text-base"
                        autoComplete="off"
                        value={newData.confirmPassword}
                        type="password"
                        onChange={(e) => setNewData({ ...newData, confirmPassword: e.target.value })}
                      />
                    </div>

                    <button className="bg-primary w-full mt-2 py-4 text-center text-black rounded-md transition-all duration-150 focus:bg-amber-500" type="submit">
                      Edit
                    </button>
                  </form>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default EditProfilePage;
