import React from "react";
import { FaLocationDot, FaPhone, FaRegEnvelope } from "react-icons/fa6";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <>
      <main className="bg-primary">
        <section className="container flex justify-between flex-wrap gap-4 py-8 px-4 md:px-0">
          <div className="w-full md:w-[47%] lg:w-[32%] flex flex-col items-start">
            <h1 className="text-2xl font-semibold pb-4">Rent Car Service</h1>
            <p className="text-black/70 text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis dolore quos quibusdam, ullam voluptatum magni vitae fugit! At, nulla deleniti!</p>
          </div>
          <div className="w-full md:w-[47%] lg:w-[32%] ">
            <h1 className="text-2xl font-semibold pb-4">Our Cars</h1>
            <Link to="/about" className="flex flex-col gap-2 w-max text-black/70 font-medium">
              <h1>New Fortuner Sport</h1>
              <h1>Land Cruiser</h1>
              <h1>New Hiace Commuter</h1>
              <h1>Kijang Innova Zenix</h1>
            </Link>
          </div>
          <div className="w-full md:w-[47%] lg:w-[32%]">
            <h1 className="text-2xl font-semibold pb-4">Contact Us</h1>
            <div className="flex flex-col gap-3 text-black/70 font-medium text-sm">
              <div className="flex gap-4 items-center">
                <FaLocationDot size={18} />
                <p>Ketintang Street Number 29, Surabaya</p>
              </div>
              <div className="flex gap-4 items-center">
                <FaRegEnvelope size={18} />
                <p>rentcar.services@gmail.com</p>
              </div>
              <div className="flex gap-4 items-center">
                <FaPhone size={18} />
                <p>+628123456789</p>
              </div>
            </div>
          </div>
          <div className="border-t border-black/20 flex w-full justify-center mt-4 pt-6">Copyright &copy; 2023 Rent Car Service</div>
        </section>
      </main>
    </>
  );
};

export default index;
