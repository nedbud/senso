"use client";

interface HeadingProps {
  red: Boolean;
  heading: String;
  description: String;
}

const Heading: React.FC<HeadingProps> = ({ heading, description, red }) => {
  const lastPart = heading.split(" ")[heading.split(" ").length - 1];
  const otherParts =
    heading.split(" ")[0] +
    " " +
    heading.split(" ")[
      heading.split(" ").length - (heading.split(" ").length - 1)
    ];

  return (
    <div className="flex flex-col items-center justify-center space-y-4 cursor-default">
      <h2
        className={`flex flex-row items-center justify-center border rounded-md py-1 px-2 
                bg-[#CA0508]
                space-x-2 text-md lg:text-3xl 
                hover:-rotate-6 hover:mb-5 hover:shadow-xl ease-in-out duration-300`}
      >
        <span
          className={`${red ? "text-black/80 lg:text-white" : "text-red-100"}`}
        >
          {otherParts}
        </span>
        <span className={`font-bold ${red ? "text-white" : "text-white"}`}>
          {lastPart}
        </span>
      </h2>
      <p
        className={`${
          red ? "text-white/70" : "text-gray-500"
        } lg:w-1/2 text-center text-[10px] lg:text-sm font-semibold`}
      >
        {description}
      </p>
    </div>
  );
};

export default Heading;
