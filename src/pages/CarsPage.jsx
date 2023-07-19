import axios from "axios";
import React from "react";
import { FaArrowRightLong, FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CarsPage = () => {
  const [datas, setDatas] = React.useState({});
  const [auth, setAuth] = React.useState(JSON.parse(sessionStorage.getItem("auth")) || "");

  const getDatas = async () => {
    try {
      const response = await axios.get("https://api-rent-car.vercel.app/product");
      const data = response.data.data;
      setDatas(data);
    } catch (error) {
      setDatas({});
    }
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    getDatas();
  }, []);

  const loadDatas = () => {
    if (datas == null) return <h1>Loading ....</h1>;
    if (datas.length == null) return <h1>Not Found</h1>;
    return (
      datas != null &&
      datas.map((data, i) => (
        <div key={data.id} className=" w-full md:w-[47%] lg:w-[32%]  flex flex-col items-center rounded-lg overflow-hidden shadow-sm border border-black/20">
          <img src={data.url} alt="" className="w-full object-contain h-full" />
          <div className=" w-full h-full px-4 pb-2 flex flex-col justify-end">
            <h1 className="text-center pb-2 font-medium text-lg">{data.name}</h1>
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
              <div className="flex items-center gap-2 bg-gray-200 rounded-sm p-2 w-[47%]">
                <FaCircleCheck size={18} color="#FBBF24" />
                <p>${data.price}</p>
              </div>
              <div className="flex items-center gap-2 bg-gray-200 p-2 rounded-sm w-[47%]">
                <FaCircleCheck size={18} color="#FBBF24" />
                <p>{data.type}</p>
              </div>
              <div className="flex items-center gap-2 bg-gray-200 p-2 rounded-sm w-[47%]">
                <FaCircleCheck size={18} color="#FBBF24" />
                <p>{data.brand}</p>
              </div>
              <div className="flex items-center gap-2 bg-gray-200 p-2 rounded-sm w-[47%]">
                <FaCircleCheck size={18} color="#FBBF24" />
                <p>{data.year}</p>
              </div>
            </div>
            <Link
              to={auth == "" ? `/login` : `/detail/${data.id}`}
              className="bg-primary mb-2 flex justify-center items-center gap-2 w-full py-2 text-center text-black rounded-md transition-all duration-150 focus:bg-amber-500"
              type="submit"
            >
              Rent a car
              <FaArrowRightLong size={14} />
            </Link>
          </div>
        </div>
      ))
    );
  };

  return (
    <>
      <main className="pt-[50px] md:pt-[150px] lg:pt-[130px] -z-50">
        <section className="container py-8 w-full flex flex-wrap items-center px-4 md:px-0">
          <div className="flex justify-center w-full pb-4">
            <h1 className="text-2xl lg:text-4xl font-semibold ">
              Cars <span className="text-primary font-bold">Collection</span>
            </h1>
          </div>
          <div className="w-full flex flex-wrap justify-center md:justify-between pt-4 mb-6 gap-4">{loadDatas()}</div>
        </section>
      </main>
    </>
  );
};

export default CarsPage;
