import axios from "axios";
import React from "react";
import { Navigate } from "react-router-dom";

const index = () => {
  const [datas, setDatas] = React.useState({});
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const post = await axios.post("https://api-rent-car.vercel.app/login", datas);
      const response = post.data;

      console.log(response);

      if (response.status == 200) {
        window.location.href = "/";
      }

      setMessage(response.message);
      setStatus(response.status);

      if (response.status != 200) return;

      sessionStorage.setItem("auth", JSON.stringify(response.data));

      // sessionStorage.setItem("id", response.data.id);
      // sessionStorage.setItem("token", response.data.token);
      // sessionStorage.setItem("role", response.data.role);
      // sessionStorage.setItem("email", response.data.email);

      setTimeout(() => {
        setMessage("");
        setStatus("");
      }, 5000);

      e.target.reset();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className={` transition-all duration-500 w-full py-3 text-center text-black rounded-md ${message === "" ? "hidden" : "block"} ${status == 400 ? "bg-red-200" : "bg-green-200"} `} type="submit">
          {message}
        </div>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Email*"
          className="w-full placeholder:text-base px-3 py-4 focus:outline-none shadow-sm border border-black/30 rounded-md text-base"
          autoComplete="off"
          onChange={(e) => setDatas({ ...datas, email: e.target.value })}
        />
        <input
          id="password"
          name="password"
          required
          placeholder="Password*"
          className="w-full placeholder:text-base px-3 py-4 focus:outline-none shadow-sm border border-black/30 rounded-md text-base"
          autoComplete="off"
          type="password"
          onChange={(e) => setDatas({ ...datas, password: e.target.value })}
        />
        <button className="bg-primary w-full py-4 text-center text-black rounded-md transition-all duration-150 focus:bg-amber-500" type="submit">
          Login
        </button>
      </form>
    </>
  );
};

export default index;
