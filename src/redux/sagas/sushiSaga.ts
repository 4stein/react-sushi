import { ISushiParams } from "./../../api/apiServices";
import { PayloadAction } from "@reduxjs/toolkit";
import { takeEvery, put, call, all } from "redux-saga/effects";
import {
  fetchSushisLength,
  fetchSushisData,
  fetchCurrentSushi,
} from "../../api/apiServices";
import {
  fetchCurrentSushiAction,
  fetchItemsAction,
  setCurrentSushiAction,
  setErrorsAction,
  setItemsAction,
} from "../slices/sushiSlice";
import { AxiosResponse } from "axios";

function* sushiWorkerSaga(action: PayloadAction<ISushiParams>) {
  try {
    const { currentPage, category, sortBy, order, search } = action.payload;
    const resSushis: AxiosResponse = yield call(
      fetchSushisLength,
      category,
      sortBy,
      order,
      search
    );
    const pagesCount = +Math.ceil(resSushis.data.length / 4);
    const { data } = yield call(
      fetchSushisData,
      category,
      sortBy,
      order,
      search,
      currentPage
    );
    yield put(setItemsAction({ data, pagesCount }));
  } catch (error) {
    yield put(setErrorsAction());
  }
}

function* currentSushiWorkerSaga(action: PayloadAction<{ id: string }>) {
  try {
    const { id } = action.payload;
    const { data } = yield call(fetchCurrentSushi, id);
    yield put(setCurrentSushiAction(data));
  } catch (error) {
    console.log(error);
  }
}

export default function* sushiSaga() {
  yield all([
    takeEvery(fetchItemsAction.type, sushiWorkerSaga),
    takeEvery(fetchCurrentSushiAction.type, currentSushiWorkerSaga),
  ]);
}
