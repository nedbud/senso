/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const items = [
  { id: 1, icon: "/assets/Icons/smartphone.svg", name: "02-48114837, +8801322-926207, +8801731-008075" },
  {
    id: 2,
    icon: "/assets/Icons/envelope.svg",
    name: "info@sensohearingdhaka.com",
    alt: "Senso-Envelop-Icon",
  },
  {
    id: 3,
    icon: "/assets/Icons/home.svg",
    name: "57/9, Artisan Center (4th floor), Panthapath, Dhaka-1205",
    alt: "Senso-Address-Icon",
  },
];

export default function Contact() {
  const form = useRef<any>(null);

  const service_id: string = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
  const template_id: string = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
  const account_id: string = process.env.NEXT_PUBLIC_EMAILJS_ACCOUNT_ID || "";

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const name = form.current.querySelector('input[name="name"]');
    const phone = form.current.querySelector('input[name="phone"]');
    const email = form.current.querySelector('input[name="email"]');
    const message = form.current.querySelector('textarea[name="message"]');

    emailjs.sendForm(service_id, template_id, form?.current, account_id).then(
      (result) => {
        if (result.text === "OK") {
          toast.success(
            "Your request is successfully saved. Please wait for our confirmation"
          );
        } else {
          toast.error("We could not find your request. Please try again later");
        }
      },
      (error) => {
        console.log(error.text);
      }
    );
  };
  return (
    <div id="contact" className="bg-gray-100 pb-32 lg:pt-20 lg:pb-40">
      {/* contact form  */}
      <div className="overflow-hidden">
        <div className="max-w-6xl mx-auto min-h-[682px] relative">
          <div className="relative z-[5] grid gap-5 grid-cols-1 md:grid-cols-2 rounded-lg bg-white text-center shadow">
            <div className="flex flex-col p-4 lg:px-10 lg:pt-10 lg:pb-20">
              <div className="flex items-center">
                <div className="bg-red-700 w-14 h-[3px]"></div>
                <span className="text-theme_blue mx-2 lg:mx-5 text-md lg:text-lg">
                  Say hi,
                </span>
                <img
                  src="/assets/Icons/Contact/waving.svg"
                  alt="Senso-Waving-Icon"
                  className="w-5 lg:w-10 animate-bounce"
                />
              </div>
              <div className="text-start text-xl md:text-5xl font-semibold leading-snug md:leading-none my-2 lg:my-10">
                <p>
                  Let’s <span className="text-red-700">talk</span> about your
                  <span className="text-red-700"> Problem!</span>
                </p>
              </div>
              <div className="text-start text-sm lg:text-xl">
                <p className="text-[#8f8f8f]">
                  We’d love to connect with you to talk about your Problems and
                  possible circumstance!
                </p>
              </div>

              <ul role="list" className="mt-5 lg:mt-7	text-base lg:text-xl">
                {items.map((item) => (
                  <li key={item.id} className="flex py-2 lg:py-4 items-start">
                    <img
                      src={item.icon}
                      alt={item.alt}
                      className="mr-5 lg:mr-10 w-5 lg:w-7"
                    />
                    <p className="text-start text-sm lg:text-base">
                      {item.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* contact form  */}
            <div className="lg:py-10 px-6 sm:px-10 xl:p-12">
              <form ref={form} onSubmit={handleSubmit} className="lg:mt-6">
                <div className="lg:my-8">
                  <div className="lg:mt-1 relative">
                    <input
                      type="text"
                      name="name"
                      id="first-name"
                      placeholder="Name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm bg-[#F6F6F6]"
                    />
                    <img
                      className="absolute top-3 right-3"
                      src="/assets/Icons/Contact/user.svg"
                      alt="Senso-User-Icon"
                    />
                  </div>
                </div>

                <div className="my-8">
                  <div className="mt-1 relative">
                    <input
                      id="email"
                      placeholder="Email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm bg-[#F6F6F6]"
                    />
                    <img
                      className="absolute top-3 right-3"
                      src="/assets/Icons/Contact/mail.svg"
                      alt="Senso-Contact-Icon"
                    />
                  </div>
                </div>

                <div className="my-8">
                  <div className="mt-1 relative">
                    <input
                      type="text"
                      placeholder="Phone"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm bg-[#F6F6F6]"
                      aria-describedby="phone-optional"
                    />

                    <img
                      className="absolute top-3 right-3"
                      src="/assets/Icons/Contact/phone.svg"
                      alt="Senso-Phone-Icon"
                    />
                  </div>
                </div>

                <div className="my-8">
                  <div className="mt-1 relative">
                    <textarea
                      id="message"
                      placeholder="Tell us what you want to know"
                      name="message"
                      rows={4}
                      className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm bg-[#F6F6F6]"
                      aria-describedby="message-max"
                      defaultValue={""}
                    />

                    <img
                      className="absolute top-3 right-3"
                      src="/assets/Icons/Contact/speech.svg"
                      alt="Senso-Speech-Icon"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:flex sm:justify-start ">
                  <button
                    type="submit"
                    className="inline-flex mb-4 lg:mb-0 items-center px-6 py-2 border border-transparent text-lg font-medium rounded-full shadow-sm text-white bg-red-700 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="bg-[#CA0505] absolute rounded-[31px] h-[621px] bottom-5 left-32 w-[91%] z-[3]"></div>

          <div className="bg-red-800 absolute rounded-[31px] h-[621px] bottom-1 left-[200px] w-[84%] z-[2]"></div>
        </div>
      </div>
    </div>
  );
}
