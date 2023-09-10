import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface ProductSearchState {
  series: number | "all";
  best: boolean;
  latest: boolean;
  trending: boolean;
  sort: "desc" | "asc";
}

const initialState: ProductSearchState = {
  series: "all",
  best: false,
  latest: false,
  trending: false,
  sort: "desc",
};

export const productSearchSlice = createSlice({
  name: "productSearch",
  initialState,
  reducers: {
    setSeries: (
      state,
      action: PayloadAction<{
        id: number | "all";
      }>
    ) => {
      const { id } = action.payload;

      state.series = id;
    },
    toggleBestStatus: (state) => {
      state.best = !state.best;
    },
    toggleLatestStatus: (state) => {
      state.latest = !state.latest;
    },
    toggleTrendingStatus: (state) => {
      state.trending = !state.trending;
    },
    setDESC: (state) => {
      state.sort = "desc";
    },
    setASC: (state) => {
      state.sort = "asc";
    },
  },
});

export const {
  setSeries,
  toggleBestStatus,
  toggleLatestStatus,
  toggleTrendingStatus,
  setASC,
  setDESC,
} = productSearchSlice.actions;
export default productSearchSlice.reducer;
