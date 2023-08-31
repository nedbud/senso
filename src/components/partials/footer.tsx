'use client'

import React from "react";
import Image from "next/image";
import ScrollToTop from "react-scroll-to-top";
import Link from "next/link";

const social = [
  {
    name: "facebook",
    link: "/",
    imgSource: "/assets/Icons/facebook.svg",
  },
  {
    name: "linkedin",
    link: "/",
    imgSource: "/assets/Icons/linkedin.svg",
  },
  {
    name: "instagram",
    link: "/",
    imgSource: "/assets/Icons/instagram.svg",
  },
  {
    name: "twitter",
    link: "/",
    imgSource: "/assets/Icons/twitter.svg",
  },
  {
    name: "youtube",
    link: "/",
    imgSource: "/assets/Icons/youtube.svg",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-gray-100 mt-20">
      <div className="bg-red-900 text-white ">
        <div>
          <ScrollToTop
            smooth
            className="flex justify-center items-center font-bold p-2 !shadow-2xl !bg-red-700 !z-50"
            color="white"
          />
        </div>
        <div className="max-w-7xl mx-auto relative pt-16 pb-5 flex flex-col gap-5">
          <div className="py-10 absolute -top-20 rounded-t-xl bg-gradient-to-r from-purple-700 to-yellow-600  w-full flex flex-col justify-center px-8">
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-12 lg:col-span-5 flex gap-3 items-center justify-center lg:justify-start">
                <img 
                  // priority
                  src="/assets/Icons/email.svg" 
                  alt="Senso-Email-Icon"
                  // height={32}
                  // width={32} 
                />
                <p className="text-xs lg:text-lg">Subscribe to Newsletter</p>
              </div>
              <div className="col-span-12 lg:col-span-7 px-5">
                <form action="">
                  <div className="rounded-full overflow-hidden bg-white grid grid-cols-12">
                    <input
                      type="text"
                      placeholder="Enter your email"
                      name=""
                      id=""
                      className="col-span-8 p-2 lg:py-3 lg:px-6 text-gray-900/70"
                    />
                    <button className="col-span-4 bg-red-700 flex justify-center items-center gap-2 text-sm md:text-base font-bold">
                      Subscribe{" "}
                      <span className="hidden md:block">
                        <img
                          src="/assets/Icons/send.svg"
                          alt="Senso-Send-Icon"
                          className="h-4 w-4"
                          // height={100}
                          // width={100}
                        />
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="px-4 pt-16 md:pt-20 lg:pt-4">
            <div className="py-4 md:py-0">
              <div className="flex justify-center lg:justify-start">
                <img 
                    className="w-[150px]" 
                    src='/assets/Images/Common/sensoLogoWhite.png' 
                    alt="Senso-Logo-Icon" 
                    // height={100}
                    // width={100}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start justify-between text-sm">
              <div className="">
                {/* address */}
                <div className="flex flex-col items-center md:items-start gap-2 my-6 w-72">
                  <p className="uppercase font-bold">Address</p>
                  <p className="text-center lg:text-left">
                    152/2A-2, Rowshan Tower,(2nd Floor), Green Road
                    Signal,Panthpath, Dhaka-1205, Bangladesh
                  </p>
                </div>

                {/* email */}
                <div className="flex flex-col items-center md:items-start gap-2">
                  <p className="uppercase font-bold">Email</p>
                  <p className="">info@sensohearingdhaka.com</p>
                </div>
              </div>

              <div className="flex flex-col items-center md:items-start gap-6 font-bold my-6">
                <Link href="/" className="hover:border-b">FAQ</Link>
                <Link href="/" className="hover:border-b">Terms of Service</Link>
                <Link href="/" className="hover:border-b">Privacy Policy</Link>
              </div>

              <div className="mt-2 lg:mt-20">
                <p className="mb-4">Join us on social media</p>
                <div className="flex gap-2">
                  {social &&
                    social.map((item, index) => (
                      <a key={index} title={item.name} href={item.link}>
                        <img 
                          // priority
                          // height={32}
                          // width={32}
                          src={item.imgSource} 
                          alt={item.name} 
                          className="hover:scale-110" 
                        />
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* width line  */}
          <div className="border-[0.5px] border-[rgba(255,255,255,0.6)] mt-4"></div>

          <div className="grid grid-cols-12 justify-between">
            <div className="col-span-12 lg:col-span-6">
              <p className="text-center lg:text-start">
                Copyright &copy;{currentYear}, Senso Hearing Center{" "}
              </p>
            </div>
            <div className="col-span-12 lg:col-span-6 flex justify-center lg:justify-end">
              <Link
                href="https://nedbud.com/"
                target="_blank"
                className="flex justify-center items-center cursor-pointer"
              >
                Developed by:
                <span>
                  <img
                    className="h-8 w-8 mx-2 bg-white rounded-full p-1"
                    src='/assets/Images/Common/developedBy.png'
                    alt="Senso-Developed-Icon"
                    // height={100}
                    // width={100}
                  />
                </span>{" "}
                NedBud Infosys
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
