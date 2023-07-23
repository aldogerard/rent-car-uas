import React from "react";
import { FaArrowRightFromBracket, FaBasketShopping, FaCarRear, FaChevronLeft, FaEnvelopeOpenText, FaUser, FaUsers } from "react-icons/fa6";
import { Link } from "react-router-dom";

const index = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const logout = () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (!confirm) return;
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <section className="flex  bg-dark relative ">
        <nav className={`${isOpen ? "w-72 md:w-56" : "w-16 "} px-2 justify-between transition-all fixed bg-dark z-50 duration-300 flex flex-col py-8 h-screen`}>
          <div className={`cursor-pointer absolute p-2 bg-white border border-dark rounded-full top-20 -right-[12px] ${!isOpen ? "rotate-180" : ""}`} onClick={() => setIsOpen(!isOpen)}>
            <FaChevronLeft size={8} color="black" />
          </div>

          <Link to="/admin" className="flex px-2 gap-4 items-center justify-start">
            <div className="p-2 bg-primary rounded-md ">
              <FaCarRear size={18} color="#171717" />
            </div>
          </Link>

          <main className=" flex flex-col gap-y-2">
            <Link to="/admin" className={`flex gap-4 p-4 rounded-md hover:bg-gray-800 duration-300 items-center ${isOpen ? "justify-start" : "justify-start"} `}>
              <div className={`${!isOpen && "mx-auto"}`}>
                <FaUser size={14} color="#eee" />
              </div>
              <h1 className={`${isOpen ? "" : "hidden"} text-sm md:text-md text-white`}>Profile</h1>
            </Link>

            <Link to="/admin/cars" className={`flex gap-4 p-4 rounded-md hover:bg-gray-800 duration-300 items-center ${isOpen ? "justify-start" : "justify-start"} `}>
              <div className={`${!isOpen && "mx-auto"}`}>
                <FaCarRear size={14} color="#eee" />
              </div>
              <h1 className={`${isOpen ? "" : "hidden"} text-sm md:text-md text-white`}>Products</h1>
            </Link>

            <Link to="/admin/users" className={`flex gap-4 p-4 rounded-md hover:bg-gray-800 duration-300 items-center ${isOpen ? "justify-start" : "justify-start"} `}>
              <div className={`${!isOpen && "mx-auto"}`}>
                <FaUsers size={14} color="#eee" />
              </div>
              <h1 className={`${isOpen ? "" : "hidden"} text-sm md:text-md text-white`}>Users</h1>
            </Link>

            <Link to="/admin/order" className={`flex gap-4 p-4 rounded-md hover:bg-gray-800 duration-300 items-center ${isOpen ? "justify-start" : "justify-start"} `}>
              <div className={`${!isOpen && "mx-auto"}`}>
                <FaBasketShopping size={14} color="#eee" />
              </div>
              <h1 className={`${isOpen ? "" : "hidden"} text-sm md:text-md text-white`}>Order</h1>
            </Link>

            <Link to="/admin" className={`flex gap-4 p-4 rounded-md hover:bg-gray-800 duration-300 items-center ${isOpen ? "justify-start" : "justify-start"} `}>
              <div className={`${!isOpen && "mx-auto"}`}>
                <FaEnvelopeOpenText size={14} color="#eee" />
              </div>
              <h1 className={`${isOpen ? "" : "hidden"} text-sm md:text-md text-white`}>Message</h1>
            </Link>
          </main>

          <div onClick={logout} className={`flex gap-4 p-4 rounded-md hover:bg-gray-800 duration-300 items-center ${isOpen ? "justify-start" : "justify-start"} `}>
            <div className={`${!isOpen && "mx-auto"}`}>
              <FaArrowRightFromBracket size={18} color="#eee" />
            </div>
            <h1 className={`${isOpen ? "" : "hidden"} md:text-md text-white`}>Logout</h1>
          </div>
        </nav>

        <main className={`bg-white overflow-x-hidden transition-all duration-300 w-full rounded-s-xl py-10 px-6 sm:px-8 md:px-16 relative ${isOpen ? "ml-56" : "ml-16"} min-h-screen`}>{children}</main>
      </section>
    </>
  );
};

export default index;
