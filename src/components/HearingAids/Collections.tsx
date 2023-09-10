"use client";

import { SeriesInterface } from "@/routes/product";
import { useDispatch } from "react-redux";
import { productSearchSlice } from "@/redux/features/productSearch.slice";
import { useAppSelector } from "@/redux/hook";

const Collections: React.FC<SeriesInterface> = ({ series }) => {
  const dispatch = useDispatch();

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

  return (
    <div className="flex flex-col space-y-2 justify-start">
      <p className="text-2xl text-[#CA0508] font-bold pb-4">Series</p>
      <button
        type="button"
        className={`${
          seriesId === "all"
            ? "text-[#CA0508] text-lg font-bold"
            : "font-medium text-gray-900 hover:text-[#CA0508] text-semibold"
        } text-left`}
        onClick={() => setSeries("all")}
      >
        All
      </button>
      {series.map((item: any, index: number) => (
        <button
          type="button"
          key={index}
          className={`${
            seriesId === item.id
              ? "text-[#CA0508] text-lg font-bold"
              : "font-medium text-gray-900 hover:text-[#CA0508] text-semibold"
          } text-left`}
          onClick={() => setSeries(item.id)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default Collections;
