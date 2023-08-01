import React from "react";
import SideBarAdmin from "../../components/Fragments/SideBarAdmin/index.jsx";
import { useParams } from "react-router-dom";
import { getDataCarsById, updateProduct } from "../../utils/api.js";
import { useEffect } from "react";

const AdminEditCarsPage = () => {
  const { id } = useParams();

  const [data, setData] = React.useState({});
  const [carImage, setcarImage] = React.useState("");

  const [carPreview, setCarPreview] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [message, setMessage] = React.useState("");
  const getData = () => {
    getDataCarsById(id).then((res) => {
      setData(res);
      setCarPreview(res.url);
      setcarImage(res.images);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", carImage);
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("brand", data.brand);
    formData.append("year", data.year);
    formData.append("type", data.type);

    updateProduct(id, formData).then((res) => {
      setStatus(res.status);
      setMessage(res.message);
    });

    if (status == 200) {
      getCars();
    }

    setTimeout(() => {
      setStatus("");
      setMessage("");
    }, 3000);
  };

  const handleChange = (e) => {
    const image = e.target.files[0];
    setcarImage(image);
    setCarPreview(URL.createObjectURL(image));
  };

  return (
    <SideBarAdmin>
      <div className="w-full py-2 mb-10 border-b border-black/70">
        <h1 className="text-xl md:text-4xl font-medium">Edit Cars</h1>
      </div>
      <div className="w-full">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap">
            <div className="flex mx-auto justify-center flex-wrap gap-6">
              <img src={carPreview} alt="preview" className="w-64 h-36 object-contain" />
              <label htmlFor="carImage">
                <div className="bg-gray-100 px-6 cursor-pointer h-36 flex justify-center items-center border-dashed border border-black/50 rounded-lg">
                  <h1 className="text-sm font-light">Select Car Image</h1>
                </div>
              </label>
              <input type="file" className="hidden" accept="image/*" name="carImage" id="carImage" onChange={(e) => handleChange(e)} />
            </div>
            <div className="w-full flex mx-auto flex-wrap gap-x-6 gap-y-3 mt-6 md:max-w-lg lg:max-w-5xl">
              {message !== "" && <div className={` transition-all mb-4 duration-500 w-full py-3 font-medium text-lg text-center text-black rounded-md ${status == 200 ? "bg-green-200" : "bg-red-200"} `}>{message}</div>}
              <div className="w-full lg:w-[48%]">
                <label htmlFor="nama" className="font-medium text-md -mb-4">
                  Name
                </label>
                <input
                  id="nama"
                  name="nama"
                  required
                  value={data.name}
                  placeholder="Nama*"
                  className="w-full placeholder:text-base px-3 py-4 focus:outline-none shadow-sm border border-black/30 rounded-md text-base"
                  autoComplete="off"
                  type="text"
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </div>
              <div className="w-full lg:w-[48%]">
                <label htmlFor="brand" className="font-medium text-md -mb-4">
                  Brand
                </label>
                <input
                  id="brand"
                  name="brand"
                  required
                  value={data.brand}
                  placeholder="Brand*"
                  className="w-full placeholder:text-base px-3 py-4 focus:outline-none shadow-sm border border-black/30 rounded-md text-base"
                  autoComplete="off"
                  type="text"
                  onChange={(e) => setData({ ...data, brand: e.target.value })}
                />
              </div>
              <div className="w-full lg:w-[48%]">
                <label htmlFor="type" className="font-medium text-md -mb-4">
                  Type
                </label>
                <input
                  id="type"
                  name="type"
                  required
                  value={data.type}
                  placeholder="Type*"
                  className="w-full placeholder:text-base px-3 py-4 focus:outline-none shadow-sm border border-black/30 rounded-md text-base"
                  autoComplete="off"
                  type="text"
                  onChange={(e) => setData({ ...data, type: e.target.value })}
                />
              </div>
              <div className="w-full lg:w-[48%]">
                <label htmlFor="year" className="font-medium text-md -mb-4">
                  Year
                </label>
                <input
                  id="year"
                  name="year"
                  required
                  value={data.year}
                  placeholder="Year*"
                  className="w-full placeholder:text-base px-3 py-4 focus:outline-none shadow-sm border border-black/30 rounded-md text-base"
                  autoComplete="off"
                  type="text"
                  onChange={(e) => setData({ ...data, year: e.target.value })}
                />
              </div>
              <div className="w-full lg:w-[48%]">
                <label htmlFor="price" className="font-medium text-md -mb-4">
                  Price
                </label>
                <input
                  id="price"
                  name="price"
                  required
                  value={data.price}
                  placeholder="Price*"
                  className="w-full placeholder:text-base px-3 py-4 focus:outline-none shadow-sm border border-black/30 rounded-md text-base"
                  autoComplete="off"
                  type="number"
                  onChange={(e) => setData({ ...data, price: e.target.value })}
                />
              </div>
              <button className="bg-primary w-full mx-auto mt-2 py-4 text-center text-black rounded-md transition-all duration-150 focus:bg-amber-500" type="submit">
                Edit
              </button>
            </div>
          </div>
        </form>
      </div>
    </SideBarAdmin>
  );
};

export default AdminEditCarsPage;
