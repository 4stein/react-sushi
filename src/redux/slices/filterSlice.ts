import { RootState } from "./../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TSortType = {
  name: string;
  sortProperty: "rating" | "-rating" | "price" | "-price" | "title" | "-title";
};

export interface IfilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sortType: TSortType;
}

const initialState: IfilterSliceState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sortType: {
    name: "Popular (DESC)",
    sortProperty: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValueAction: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
      state.currentPage = 1;
    },
    setCategoryIdAction: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
      state.currentPage = 1;
    },
    setCurrentPageAction: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSortTypeAction: (state, action: PayloadAction<TSortType>) => {
      state.sortType = action.payload;
      state.currentPage = 1;
    },
    setFiltersAction: (state, action) => {
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.sortType = action.payload.sortType;
    },
  },
});

export const filterSelector = (state: RootState) => state.filter;

export const {
  setSearchValueAction,
  setCategoryIdAction,
  setCurrentPageAction,
  setSortTypeAction,
  setFiltersAction,
} = filterSlice.actions;

export default filterSlice.reducer;
