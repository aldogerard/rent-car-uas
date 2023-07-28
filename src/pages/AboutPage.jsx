import React, { useEffect } from "react";
import { FaCircleCheck, FaClock, FaShieldHeart, FaUsersGear } from "react-icons/fa6";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main className="pt-[50px] md:pt-[150px] lg:pt-[130px] -z-50">
        <section className="container py-8 w-full flex flex-wrap-reverse items-center px-4 md:px-0">
          <div className="w-full lg:w-1/2">
            <h3 className="text-xl lg:text-2xl text-primary font-semibold">About Us</h3>
            <h1 className="text-2xl lg:text-3xl font-bold">Welcome to Rent Car Service</h1>
            <p className="text-gray-500 font-light text-sm mt-2">Kami menyediakan layanan rental mobil dengan kualitas terbaik serta durasi yang flexibel agar pengguna dapat merasak nyaman saat merental mobil</p>
            <div className="text-gray-500 font-light text-xs lg:text-sm mt-4 flex flex-wrap gap-y-2 ">
              <div className="flex items-center gap-2 w-1/2">
                <FaCircleCheck size={12} color="#FBBF24" />
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
              <div className="flex items-center gap-2 w-1/2">
                <FaCircleCheck size={12} color="#FBBF24" />
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
              <div className="flex items-center gap-2 w-1/2">
                <FaCircleCheck size={12} color="#FBBF24" />
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
              <div className="flex items-center gap-2 w-1/2">
                <FaCircleCheck size={12} color="#FBBF24" />
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <img src="/images/about.png" alt="" className="w-2/3 lg:w-4/5 mx-auto" />
          </div>
        </section>
        <section className="bg-gray-100">
          <div className="container px-4 lg:px-0 py-16">
            <h1 className="text-2xl lg:text-4xl text-center font-semibold ">
              Why <span className="text-primary font-bold">Choose Us</span>
            </h1>
            <div className="mt-14 flex flex-wrap gap-12 justify-center">
              <div className="w-full flex flex-col items-center gap-4 md:w-[45%] lg:w-[30%]">
                <FaShieldHeart size={56} color="#FBBF24" />
                <h1 className="text-xl font-bold uppercase">We Are Passionate</h1>
                <p className="text-center max-w-sm text-xs text-gray-500 -mt-2 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptatem deserunt culpa magni ipsum ad?</p>
              </div>
              <div className="w-full flex flex-col items-center gap-4 md:w-[45%] lg:w-[30%]">
                <FaClock size={56} color="#FBBF24" />
                <h1 className="text-xl font-bold uppercase">Always On Time</h1>
                <p className="text-center max-w-sm text-xs text-gray-500 -mt-2 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptatem deserunt culpa magni ipsum ad?</p>
              </div>
              <div className="w-full flex flex-col items-center gap-4 md:w-[45%] lg:w-[30%]">
                <FaUsersGear size={56} color="#FBBF24" />
                <h1 className="text-xl font-bold uppercase">Professional Services</h1>
                <p className="text-center max-w-sm text-xs text-gray-500 -mt-2 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptatem deserunt culpa magni ipsum ad?</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
