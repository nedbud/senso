import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductsApiState {
  series: number | "all";
  best: boolean;
  trending: boolean;
  latest: boolean;
  sort: "asc" | "desc";
}

const initialState: ProductsApiState = {
  series: 2,
  best: true,
  trending: false,
  latest: false,
  sort: "desc",
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setSeries: (state, action) => {
      console.log(action.payload);
      state.series = action.payload;
    },
    setBestStatus: (state, action: PayloadAction<boolean>) => {
      state.best = action.payload;
    },
  },
});

export const { setBestStatus, setSeries } = productSlice.actions;

export default productSlice.reducer;
