import { all, fork } from "redux-saga/effects";
import axios from "axios";
import postSaga from "./post";
import userSaga from "./user";

axios.defaults.baseURL = "http://localhost:3065"; //이렇게 중복을 제거할수있음
axios.defaults.withCredentials = true; //원래 요청마다 {withCredentials : true} 넣어야되는데 이렇게하면 중복 제거 ㄱㄴ
export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}
