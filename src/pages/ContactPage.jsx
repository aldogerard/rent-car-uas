import axios from "axios";
import React, { useEffect } from "react";

import hero from "../../public/images/hero.jpg";

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const post = await axios.post("https://api-rent-car.vercel.app/message", {
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value,
      });

      const response = post.data;

      if (response.status === 200) {
        alert(`Thank you ${e.target.name.value} for your message!`);
        return e.target.reset();
      } else {
        return alert(`Sorry ${e.target.name.value} your message is not sent!`);
      }
    } catch (error) {
      return alert(`Sorry ${e.target.name.value} your message is not sent!`);
    }
  };

  return (
    <main className="pt-[50px] md:pt-[150px] lg:pt-[130px] -z-50 bg-[#171717]">
      <section className="container py-8 w-full flex flex-wrap items-center px-4 md:px-0 gap-y-2">
        <div className="w-full lg:w-1/2 uppercase text-white">
          <h1 className="text-2xl lg:text-3xl font-bold">
            Do You Have Any Questions?
          </h1>
          <h2 className="text-xl lg:text-3xl font-medium">
            Feel Free To Contact Us
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-1/2 flex flex-col gap-2"
        >
          <div className="flex gap-2">
            <input
              id="name"
              name="name"
              required
              placeholder="Name"
              className="w-1/2 placeholder:text-base p-2 focus:outline-none shadow-sm border-b-2 border-primary rounded-md text-base"
              autoComplete="off"
              type="text"
            />
            <input
              id="email"
              name="email"
              required
              placeholder="Email"
              className="w-1/2 placeholder:text-base p-2 focus:outline-none shadow-sm border-b-2 border-primary rounded-md text-base"
              autoComplete="off"
              type="email"
            />
          </div>
          <div className="flex gap-2">
            <input
              id="message"
              maxLength={30}
              name="message"
              required
              placeholder="Message"
              className="w-2/3 placeholder:text-base p-2 focus:outline-none shadow-sm border-b-2 border-primary rounded-md text-base"
              autoComplete="off"
              type="text"
            />
            <button
              className="bg-primary w-1/3 p-2 outline-none text-center text-white rounded-md transition-all duration-150 focus:bg-amber-500"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </section>
      <section className="bg-cover" style={{ backgroundImage: `url(${hero})` }}>
        <div className="w-full bg-black/80">
          <div className="container py-14 pb-20 px-4 lg:px-0 flex flex-col items-center justify-center gap-6">
            <h1 className="text-white text-xl lg:text-4xl font-semibold">
              Our Location
            </h1>
            <div className="border-2 w-full h-80 md:h-96 lg:w-auto lg:h-auto border-amber-300 rounded-lg overflow-hidden">
              <iframe
                width="700px"
                height="400px"
                src="https://maps.google.com/maps?q=jalan kalimas baru blok b14 nomer 29&t=&z=13&ie=UTF8&iwloc=&output=embed"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
