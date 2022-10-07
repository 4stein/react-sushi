import { RootState } from "./../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLSCart } from "../../utils/getLSCart";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

export type TSushiCartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  type: string;
  rating: number;
  count: number;
};

export interface ICartSliceState {
  totalPrice: number;
  items: TSushiCartItem[];
}

const { items, totalPrice } = getLSCart();

const initialState: ICartSliceState = {
  totalPrice,
  items,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemAction: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    updateItemAction: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.type = action.payload.type;
        findItem.size = action.payload.size;
      }
    },
    minusItemAction: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeItemAction: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearItemsAction: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const cartSelector = (state: RootState) => state.cart;

export const {
  addItemAction,
  updateItemAction,
  removeItemAction,
  clearItemsAction,
  minusItemAction,
} = cartSlice.actions;

export default cartSlice.reducer;
