import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const InfoPage = () => {
  const id = useParams().id;

  const [datas, setDatas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getDataCars = async () => {
    const data = await axios.get(`http://localhost:3000/order/cars/${id}`);
    const res = data.data.data;
    console.log(res);
    setDatas(res != null ? res.sort((a, b) => new Date(a.tanggalOrder[0]).getTime() - new Date(b.tanggalOrder[0]).getTime()) : []);
    setIsLoading(false);
  };

  useEffect(() => {
    getDataCars();
  }, []);

  return (
    <main className="pt-[50px] md:pt-[150px] lg:pt-[130px] -z-50">
      <section className="container px-4 md:px-0 py-10 pb-20">
        <h1 className="text-2xl lg:text-3xl font-medium mb-4">Information</h1>
        <div className="w-full flex flex-wrap overflow-x-auto rounded-lg shadow-md">
          <table className="w-full bg-gray-50 border-collapse">
            <thead className="">
              <tr className="text-left border bg-gray-200 text-gray-600">
                <th className="p-4">Car</th>
                <th className="p-4">Start Rent</th>
                <th className="p-4">End Rent</th>
              </tr>
            </thead>
            <tbody className="">
              {!isLoading &&
                datas.length != 0 &&
                datas.map((res, i) => (
                  <tr key={res.id} className="text-sm border hover:bg-gray-100">
                    <td className="capitalize p-4 ">{res.responseMobil.name}</td>
                    <td className=" p-4">{res.tanggalOrder[0]}</td>
                    <td className=" p-4">{res.tanggalOrder[res.tanggalOrder.length - 1]}</td>
                  </tr>
                ))}
              {datas.length == 0 && (
                <tr className=" ">
                  <td colSpan={5} className=" py-6 text-center ">
                    Data not found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default InfoPage;
