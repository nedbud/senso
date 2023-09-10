"use client";

import { useDispatch } from "react-redux";
import { productSearchSlice } from "@/redux/features/productSearch.slice";
import { useAppSelector } from "@/redux/hook";

interface SortsInterface {
  sorts: {
    name: string;
    slug: string;
  }[];
}

const Sorts: React.FC<SortsInterface> = ({ sorts }) => {
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
    <div className="sticky top-24 text-right">
      <p className="text-2xl text-[#CA0508] font-bold pb-4">Sort By</p>
      {sorts.map((item, index) => (
        <a
          onClick={() => setSorts(item.slug)}
          key={index}
          className={`${
            checkSort(item.slug) === true
              ? "block cursor-pointer py-1 text-[#CA0508] text-lg font-bold"
              : "font-medium text-gray-900 hover:text-[#CA0508] block cursor-pointer py-1"
          } text-end`}
        >
          {item.name}
        </a>
      ))}
    </div>
  );
};

export default Sorts;
