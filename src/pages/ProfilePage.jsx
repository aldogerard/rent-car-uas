import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [auth, setAuth] = React.useState(JSON.parse(sessionStorage.getItem("auth")) || "");
  const [data, setData] = React.useState({});

  const { id } = auth;

  const getData = async () => {
    const datas = await axios.get(`https://api-rent-car.vercel.app/users/${id}`);
    const response = datas.data.data[0];
    setData(response);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
  }, []);

  return (
    <>
      <main className="pt-[50px] md:pt-[150px] lg:pt-[130px] -z-50">
        <div className="container px-4 md:px-0 flex flex-col items-center py-14 justify-center h-full text-black gap-6">
          {data != {} && (
            <>
              <div className="w-36">
                <img src="/images/man.png" alt="" className="object contain object-center mx-auto" />
              </div>
              <div className="w-full">
                <h1 className="text-center text-3xl font-medium mb-2">{data.nama}</h1>
                <div className="flex items-center justify-center gap-2 font-light text-gray-900">
                  <h1 className="text-center font-base">{data.email}</h1>
                  <Link to="/profile/edit" className="border border-amber-400 gap-2 text-sm shadow-sm flex justify-center items-center py-1 px-3 text-center  rounded-sm transition-all duration-150 focus:shadow-md">
                    Edit Profile
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
