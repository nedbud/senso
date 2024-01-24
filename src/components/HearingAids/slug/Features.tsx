import Check from "@/components/utils/Check";

interface FeaturesProps {
  warranty: string;
  name: string;
  price: string;
  description: string;
  features: any;
}

const Features: React.FC<FeaturesProps> = ({
  warranty,
  name,
  price,
  description,
  features,
}) => {
  return (
    <section className="p-4 border shadow-lg rounded-md">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Product Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          All details and Specification.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-4 text-gray-900">
              Product Warranty
            </dt>
            <dd className="mt-1 text-sm leading-4 text-gray-700 sm:col-span-2 sm:mt-0">
              {warranty}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-4 text-gray-900">
              Product name
            </dt>
            <dd className="mt-1 text-sm leading-4 text-gray-700 sm:col-span-2 sm:mt-0">
              {name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-4 text-gray-900">
              Price
            </dt>
            <dd className="mt-1 text-sm leading-4 text-gray-700 sm:col-span-2 sm:mt-0">
              <a href="/#contact" className="text-violet-600 hover:underline cursor-pointer">Please Contact with Us</a>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-4 text-gray-900">
              About
            </dt>
            <dd className="mt-1 text-sm leading-4 text-gray-700 sm:col-span-2 sm:mt-0">
              {description}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-4 text-gray-900">
              Features
            </dt>
            <dd className="mt-1 text-sm leading-4 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul className="space-y-4 text-left text-gray-500 cursor-default">
                {features.map((item: any, index: number) => (
                  <li key={index}>
                    <div className="flex items-center space-x-3 group">
                      <Check
                        strokeWidth={3.5}
                        className="flex-shrink-0 w-3.5 h-3.5 group-hover:scale-125 duration-700 transition-all group-hover:stroke-red-600"
                      />
                      <p className="text-primary/70 group-hover:scale-110 font-bold duration-700 transition-all">
                        {item.value}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default Features;
