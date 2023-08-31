import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { SeriesSelectInterface } from "@/redux/features/series/series";

interface MobileMenuInterface {
  series: SeriesSelectInterface;
  sorts: {
    name: string;
    slug: string;
  }[];
}

const MobileMenu: React.FC<MobileMenuInterface> = ({ series, sorts }) => {
  return (
    <div className="block lg:hidden col-span-12">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-red-700 px-4 py-2 text-left text-base font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>Collections</span>
                <ChevronDownIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-white`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                {series?.data.map((item, index) => (
                  <a
                    key={index}
                    className="block cursor-pointer py-1 text-gray-900 hover:text-[#CA0508] text-semibold"
                  >
                    {item.name}
                  </a>
                ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-red-700 px-4 py-2 text-left text-base font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>Sort By</span>
                <ChevronDownIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-white`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                {sorts.map((item, index) => (
                  <a
                    key={index}
                    className="block cursor-pointer py-1 text-gray-900 hover:text-[#CA0508] text-semibold"
                  >
                    {item.name}
                  </a>
                ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default MobileMenu;
