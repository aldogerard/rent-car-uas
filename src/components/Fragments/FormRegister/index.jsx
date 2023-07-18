import React from "react";
import { TextField, Button, Hidden } from "@mui/material";
import axios from "axios";

const index = () => {
  const [datas, setDatas] = React.useState({});
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const post = await axios.post("https://api-rent-car.vercel.app/users", datas);
      const response = post.data;
      setMessage(response.message);
      setStatus(response.status);
      setTimeout(() => {
        setMessage("");
        setStatus("");
      }, 5000);
    } catch (error) {
      alert(error);
    }
    e.target.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col flex-wrap md:flex-row gap-4 justify-between">
        <div className={` transition-all duration-500 w-full py-3 text-center text-black rounded-md ${message === "" ? "hidden" : "block"} ${status == 400 ? "bg-red-200" : "bg-green-200"} `} type="submit">
          {message}
        </div>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Email*"
          className="w-full md:w-[48%] placeholder:text-base px-3 py-4 focus:outline-none shadow-sm border border-black/30 rounded-md text-base"
          autoComplete="off"
          onChange={(e) => setDatas({ ...datas, email: e.target.value })}
        />
        <input
          type="text"
          id="Name"
          name="Name"
          required
          placeholder="Name*"
          className="w-full md:w-[48%] placeholder:text-base px-3 py-4 focus:outline-none shadow-sm border border-black/30 rounded-md text-base"
          autoComplete="off"
          onChange={(e) => setDatas({ ...datas, nama: e.target.value })}
        />
        <input
          type="text"
          id="number"
          name="number"
          required
          placeholder="Phone Number*"
          className="w-full md:w-[48%] placeholder:text-base px-3 py-4 focus:outline-none shadow-sm border border-black/30 rounded-md text-base"
          autoComplete="off"
          onChange={(e) => setDatas({ ...datas, nomor: e.target.value })}
        />
        <input
          type="password"
          id="password"
          name="password"
          required
          placeholder="Password*"
          className="w-full md:w-[48%] placeholder:text-base px-3 py-4 focus:outline-none shadow-sm border border-black/30 rounded-md text-base"
          autoComplete="off"
          onChange={(e) => setDatas({ ...datas, password: e.target.value })}
        />
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          placeholder="Confirm Password*"
          className="w-full md:w-[48%] placeholder:text-base px-3 py-4 focus:outline-none shadow-sm border border-black/30 rounded-md text-base"
          autoComplete="off"
          onChange={(e) => setDatas({ ...datas, confirmPassword: e.target.value })}
        />

        <input
          type="text"
          id="alamat"
          name="alamat"
          required
          maxLength={80}
          placeholder="Alamat*"
          className="w-full md:w-[48%] placeholder:text-base px-3 py-4 focus:outline-none shadow-sm border border-black/30 rounded-md text-base resize-none"
          autoComplete="off"
          onChange={(e) => setDatas({ ...datas, alamat: e.target.value })}
        />
        <button className="bg-primary w-full py-4 text-center text-black rounded-md" type="submit">
          Register
        </button>
      </form>
    </>
  );
};

export default index;
