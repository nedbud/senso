"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { productSearchSlice } from "@/redux/features/productSearch.slice";
import { useAppSelector } from "@/redux/hook";

interface MobileMenuInterface {
  series: any;
  sorts: {
    name: string;
    slug: string;
  }[];
}

const MobileMenu: React.FC<MobileMenuInterface> = ({ series, sorts }) => {
  const dispatch = useDispatch();

  const best: boolean = useAppSelector(
    (state) => state.productSearchSlice.best
  );

  const trending: boolean = useAppSelector(
    (state) => state.productSearchSlice.trending
  );

  const latest: boolean = useAppSelector(
    (state) => state.productSearchSlice.latest
  );

  const sort: string = useAppSelector((state) => state.productSearchSlice.sort);

  const seriesId: string | number = useAppSelector(
    (state) => state.productSearchSlice.series
  );

  const setSeries = (id: number | "all") => {
    dispatch(
      productSearchSlice.actions.setSeries({
        id,
      })
    );
  };

  const checkSort = (slug: string) => {
    if (slug === "best" && best === true) {
      return true;
    } else if (slug === "trending" && trending === true) {
      return true;
    } else if (slug === "leatest" && latest === true) {
      return true;
    } else if (slug === "asc" && sort === "asc") {
      return true;
    } else if (slug === "desc" && sort === "desc") {
      return true;
    }

    return false;
  };

  const setSorts = (sort: any) => {
    if (sort === "best") {
      dispatch(productSearchSlice.actions.toggleBestStatus());
    } else if (sort === "trending") {
      dispatch(productSearchSlice.actions.toggleTrendingStatus());
    } else if (sort === "leatest") {
      dispatch(productSearchSlice.actions.toggleLatestStatus());
    } else if (sort === "asc") {
      dispatch(productSearchSlice.actions.setASC());
    } else {
      dispatch(productSearchSlice.actions.setDESC());
    }
  };

  return (
    <div className="fixed lg:hidden col-span-12">
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
                <a
                  onClick={() => setSeries("all")}
                  className={`${
                    seriesId === "all"
                      ? "text-[#CA0508] font-bold"
                      : "text-gray-900 hover:text-[#CA0508] font-semibold"
                  } block cursor-pointer py-1 `}
                >
                  All
                </a>
                {series.map((item: any, index: number) => (
                  <a
                    onClick={() => setSeries(item.id)}
                    key={index}
                    className={`${
                      seriesId === item.id
                        ? "text-[#CA0508] font-bold"
                        : "text-gray-900 hover:text-[#CA0508] font-semibold"
                    } block cursor-pointer py-1 `}
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
                {sorts.map((item: any, index: number) => (
                  <a
                    onClick={() => setSorts(item.slug)}
                    key={index}
                    className={`${
                      checkSort(item.slug) === true
                        ? "text-[#CA0508] font-bold"
                        : "text-gray-900 hover:text-[#CA0508] font-semibold"
                    } block cursor-pointer py-1 `}
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
