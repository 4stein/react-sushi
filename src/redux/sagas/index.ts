import { all } from "redux-saga/effects";
import sushiSaga from "./sushiSaga";

export default function* rootSaga() {
  yield all([sushiSaga()]);
}
