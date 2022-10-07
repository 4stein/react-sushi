import axios from "axios";
import { TCurrentSushi } from "../redux/slices/sushiSlice";

export type ISushiParams = {
  category: string;
  sortBy: string;
  order: string;
  search: string;
  currentPage?: number;
};

type IFetchSushiParams = (
  category: string,
  sortBy: string,
  order: string,
  search: string,
  currentPage?: number
) => Promise<TCurrentSushi[]>;

export const fetchSushisLength: IFetchSushiParams = async (
  category,
  sortBy,
  order,
  search
) => {
  return axios.get(
    `https://62da84719eedb69963705ee4.mockapi.io/sushis?${category}&sortBy=${sortBy}&order=${order}${search}`
  );
};

export const fetchSushisData: IFetchSushiParams = async (
  category,
  sortBy,
  order,
  search,
  currentPage,
) => {
  return axios.get(
    `https://62da84719eedb69963705ee4.mockapi.io/sushis?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
  );
};

export async function fetchCurrentSushi(id: string): Promise<TCurrentSushi> {
  return axios.get(`https://62da84719eedb69963705ee4.mockapi.io/sushis/${id}`);
}
