/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Link from "next/link";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [currentMenu, setCurrentMenu] = useState("/");
  const router = useRouter();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Hearing Aids", href: "/hearing-aids" },
    { name: "About Us", href: "/about-us" },
    { name: "Services", href: "/#services" },
    { name: "Contact Us", href: "/#contact" },
  ];
  return (
    <Disclosure as="nav" className="shadow-2xl">
      {({ open }) => (
        <>
          <div className="fixed top-0 w-full z-50 shadow-md bg-white">
            <div className="mx-auto max-w-7xl px-2 py-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block w-[130px] lg:hidden"
                      src="/assets/Images/Common/sensoLogo.png"
                      alt="Senso-Logo-Icon"
                      // priority
                      // width={100}
                      // height={100}
                    />
                    <img
                      className="hidden w-[130px] lg:block cursor-pointer"
                      onClick={() => router.push("/")}
                      src="/assets/Images/Common/sensoLogo.png"
                      alt="Senso-Logo-Icon"
                      // priority
                      // width={100}
                      // height={100}
                    />
                  </div>
                </div>
                <div className="absolute  inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex justify-center">
                      <div className="flex space-x-5">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setCurrentMenu(item.href)}
                            className={classNames(
                              item.href === currentMenu
                                ? " text-[#CA0508]"
                                : "text-gray-900  hover:text-[#CA0508]",
                              "rounded-md px-3 py-2 text-medium font-semibold"
                            )}
                            aria-current={
                              item.href === currentMenu ? "page" : undefined
                            }
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                      <Link
                        href="/#contact"
                        type="button"
                        className="ml-8 py-3 px-7 rounded-md text-white font-medium bg-[#CA0508] transform transition duration-500 hover:scale-105"
                      >
                        Book An Appointment
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden mt-20">
            <div className="fixed w-full bg-white z-10 space-y-1 px-2 pb-3 pt-2 shadow-2xl rounded-b-xl">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.href === currentMenu
                      ? "bg-[#CA0508] text-white"
                      : "text-gray-900 hover:bg-[#CA0508] hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.href === currentMenu ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}

              <div className="flex justify-center my-2">
                <button
                  type="button"
                  className="ml-0 py-2 px-5 rounded-md text-white font-medium bg-[#CA0508] hover:text-gray-900 transform transition duration-500 hover:scale-110 lg:ml-8"
                >
                  Book An Appointment
                </button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
