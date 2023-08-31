"use client";

import Heading from "../utils/Heading";
import Container from "./Container__mission";

const missionImage = "/assets/Images/temp/Business_Excellence_award_2019.jpeg";

const missions = [
  {
    description: "Ensuring hearing care is accessible and affordable to all",
  },
  {
    description:
      "Tailoring solutions to individual needs for effective hearing outcomes.",
  },
  {
    description:
      "Embracing innovation for superior hearing aids and accessories.w",
  },
  {
    description:
      "Providing understanding and guidance throughout the hearing journey.",
  },
  {
    description: "Ensuring hearing care is accessible and affordable to all.",
  },
  {
    description:
      "Fostering trusting relationships through transparency and integrity.",
  },
  {
    description:
      "Advocating for hearing health awareness and community support",
  },
  {
    description:
      "Improving quality of life through improved hearing experiences.",
  },
];

export default function Mission() {
  return (
    <section className="flex flex-col justify-center space-y-4 !mb-32 lg:space-y-10 my-10 lg:my-20 lg:px-10 px-5 items-start">
      <Heading
        red={false}
        heading="Our inspiring Mission"
        description="Our hearing center provides personalized care for individuals with hearing loss. We offer evaluations, advanced hearing aids, accessories, and maintenance services. Enhance your hearing and quality of life with our expert team."
      />
      <Container missions={missions} cover={missionImage} />
    </section>
  );
}
