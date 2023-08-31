'use client'

import Image from "next/image";
import Heading from "../utils/Heading";

const services = [
    {
      image: "/assets/Images/Services/ear.gif",
      title: "Hearing Test",
      content:
        "At our state-of-the-art hearing center, we offer a comprehensive and professional Hearing Test service to ensure our clients' auditory health and well-being. Our highly trained and experienced audiologists conduct these tests with precision and care, using advanced diagnostic equipment to assess various aspects of hearing function.",
    },
    {
      image: "/assets/Images/Services/options.gif",
      title: "Tinnitus Management",
      content:
        "At our hearing center, we offer specialized Tinnitus Management to help those experiencing the bothersome effects of tinnitus. Our expert team of audiologists provides personalized solutions, combining sound therapy, counseling, and relaxation techniques to alleviate tinnitus symptoms and improve overall auditory well-being.",
    },
    {
      image: "/assets/Images/Services/otoplasty.gif",
      title: "Ear Mould & Shell Making Facility",
      content:
        "Benefit from our cutting-edge Ear Mould & Shell Making Facility, where we craft custom-fit ear moulds and shells for hearing aids, ensuring maximum comfort and effectiveness. Experience the perfect fit for your hearing devices, tailored exclusively to your unique ear anatomy.",
    },
    {
      image: "/assets/Images/Services/gear.gif",
      title: "Repairing and Servicing of hearing aids",
      content:
        "Trust in our expert team for the reliable Repairing and Servicing of hearing aids, ensuring optimal performance and extending the lifespan of your valuable devices. Experience hassle-free solutions, so you can enjoy clear and enhanced hearing once again.",
    },
    {
      image: "/assets/Images/Services/shopping.gif",
      title: "Accessories sale (Ear Plug, Battery, Cord, Receiver, etc.)",
      content:
        "Enhance your hearing experience with our comprehensive Accessories Sale, offering a wide range of high-quality earplugs, batteries, cords, receivers, and more, perfectly suited to your specific needs and preferences. Find the perfect complement to your hearing devices and accessories for improved comfort and convenience.",
    },
    {
      image: "/assets/Images/Services/supplies.gif",
      title: "Hearing aids Sale",
      content:
        "Experience enhanced hearing and improved quality of life with our premium Hearing Aids Sale, featuring top-quality devices and expert guidance from our dedicated team of audiologists. Find the perfect hearing aid to suit your needs and preferences at our state-of-the-art hearing center.",
    },
  ];
  
  export default function Service() {
    return (
      <section id="services" className="flex flex-col justify-center space-y-10 my-10 lg:my-20">
        <Heading 
          red={false}
          heading="Services we Offer"
          description="Our hearing center provides personalized care for individuals with hearing loss. We offer evaluations, advanced hearing aids, accessories, and maintenance services. Enhance your hearing and quality of life with our expert team."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 justify-between gap-3 lg:gap-16 mx-0 lg:mx-14 px-2 md:px-16 ">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center lg:items-start text-center lg:text-start border shadow-md rounded-xl p-4 hover:border space-y-2 group"
            >
              <div>
                <img 
                  className="w-14 lg:w-24" 
                  src={service.image} 
                  alt={service.content}
                  // height={100}
                  // width={100}
                  // priority
                />
                <p className="text-red-700 text-xs font-semibold lg:text-xl lg:font-bold">
                  {service.title}
                </p>
                <p className="text-gray-500 text-left text-xs lg:text-sm">{service.content}</p>
              </div>

              <div className="absolute w-full left-0 h-full -top-2 col-span-2 md:col-span-3 opacity-0 transition-opacity group-hover:opacity-100 bg-red-900 bg-opacity-50 rounded-lg">
                  <div className="text-center w-full h-full flex items-center justify-center">
                    <button className="rounded-lg text-center text-xs lg:text-base border border-white px-6 py-2 text-white font-light shadow-md hover:bg-white hover:text-red-600 hover:font-bold">See more</button>
                  </div>
              </div>
              
            </div>
          ))}
        </div>
      </section>
    );
  }
  