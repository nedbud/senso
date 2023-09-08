"use client";

const Collections = () => {
  // const currentSeries = store?.getState()?.products.series;
  // const dispatch = useDispatch();

  return (
    <div>
      <p>asd</p>
      {/* <p className="text-2xl text-[#CA0508] font-bold pb-4">Collections</p>
      {loading ? (
        <p></p>
      ) : (
        <div className="flex flex-col justify-start space-y-2">
          <button
            type="button"
            onClick={() => dispatch(setSeries("all"))}
            className={`${
              currentSeries === "all"
                ? "text-[#CA0508] text-lg font-bold"
                : "font-medium text-gray-900 hover:text-[#CA0508] text-semibold"
            } text-left`}
          >
            All
          </button>
          {series.data.map((item: SeriesMapInterface, index: number) => (
            <button
              type="button"
              key={index}
              onClick={() => dispatch(setSeries(item.id))}
              className={`${
                currentSeries === item.id
                  ? "text-[#CA0508] text-lg font-bold"
                  : "font-medium text-gray-900 hover:text-[#CA0508] text-semibold"
              } text-left`}
            >
              {item.name}
            </button>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default Collections;
