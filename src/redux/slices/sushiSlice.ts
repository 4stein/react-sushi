import { RootState } from "./../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISushiParams } from "../../api/apiServices";

export type TCurrentSushi = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export interface ISushiSliceState {
  items: TCurrentSushi[];
  currentSushi: TCurrentSushi | null;
  pagesCount: number;
  isLoading: boolean;
  errors: boolean;
}

const initialState: ISushiSliceState = {
  items: [],
  currentSushi: null,
  pagesCount: 1,
  isLoading: false,
  errors: false,
};

export const sushiSlice = createSlice({
  name: "sushi",
  initialState,
  reducers: {
    fetchItemsAction: (state, action: PayloadAction<ISushiParams>) => {
      state.isLoading = true;
    },
    setItemsAction: (
      state,
      action: PayloadAction<{ data: TCurrentSushi[]; pagesCount: number }>
    ) => {
      state.items = action.payload.data;
      state.pagesCount = action.payload.pagesCount;
      state.isLoading = false;
    },
    setErrorsAction: (state) => {
      state.items = [];
      state.pagesCount = 1;
      state.isLoading = false;
      state.errors = true;
    },
    fetchCurrentSushiAction: (state, action: PayloadAction<{id: string | undefined}>) => {
      state.isLoading = true;
    },
    setCurrentSushiAction: (state, action: PayloadAction<TCurrentSushi>) => {
      state.currentSushi = action.payload;
      state.isLoading = false;
    },
  },
});

export const sushiSelector = (state: RootState) => state.sushi;
export const currentSushiSelector = (state: RootState) =>
  state.sushi.currentSushi;

export const {
  fetchItemsAction,
  setItemsAction,
  setErrorsAction,
  fetchCurrentSushiAction,
  setCurrentSushiAction,
} = sushiSlice.actions;

export default sushiSlice.reducer;
