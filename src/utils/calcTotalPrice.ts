import { TSushiCartItem } from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: TSushiCartItem[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
