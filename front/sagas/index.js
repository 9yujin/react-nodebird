import { all, fork, call, put } from "redux-saga/effects";
import axios from "axios";

function logInAPI(data) {
  // 제너레이터함수에서 넘긴 action.data가 첫번째 인수로! 그 다음에 넣은것들은 다음 인수로
  //얘는 제너레이터 아님!!!
  //return axios.post('/api/login) 이런 코드...
}

const l = logIn({ type: "LOG_IN_REQUEST", data: { id: "david0128@naver.com" } });
//제너레이터를 쓰면 이렇게 한줄한줄 실행을 해볼수 있음
l.next(); //밑에 login함수에 첫번째 yield 실행
l.next(); //      "       두번쩨 yield 실행

function* logIn(action) {
  //액션 자체가 매개변수로 전달이 됨. 여기서 action.data를 뽑아써
  //로그인 제너레이터 함수
  try {
    // logInAPI(action.data)를 이런 방식으로 쓰는거야. (calld을 쓸때)
    const result = yield call(logInAPI, action.data); //api호출하는 함수를 실행시키고, 결과를 저장해. 여기선 yield가 await처럼 사용됨 (call을 쓸때!!) // action.data를 매개변수로
    yield put({
      type: "LOG_IN_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      //put은 디스패치라고 생각하면 됨.
      type: "LOG_IN_FAILURE", // 요것들은 액션객체.
      data: err.respose.data,
    });
  }
}

function logOutAPI() {
  //얘는 제너레이터 아님!!!
  //return axios.post('/api/login) 이런 코드...
}
function* logOut() {
  //로그인 제너레이터 함수
  try {
    const result = yield call(logOutAPI); //api호출하는 함수를 실행시키고, 결과를 저장해. 여기선 yield가 await처럼 사용됨 (call을 쓸때!!)
    yield put({
      type: "LOG_OUT_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      //put은 디스패치라고 생각하면 됨.
      type: "LOG_OUT_FAILURE", // 요것들은 액션객체.
      data: err.respose.data,
    });
  }
}

function addPostAPI(data) {
  //얘는 제너레이터 아님!!!
  //return axios.post('/api/post',data) 이런 코드...
}
function* addPost(action) {
  //로그인 제너레이터 함수
  try {
    const result = yield call(addPostAPI, action.data); //api호출하는 함수를 실행시키고, 결과를 저장해. 여기선 yield가 await처럼 사용됨 (call을 쓸때!!)
    yield put({
      type: "ADD_POST_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      //put은 디스패치라고 생각하면 됨.
      type: "ADD_POST_FAILURE", // 요것들은 액션객체.
      data: err.respose.data,
    });
  }
}

//액션 크리에이터를 직접 실행하는게 아니라,이벤트리스너처럼 사용
//로그인 액션이 들어오면 로그인 제너레이터 함수를 실행하도록
function* watchLogin() {
  yield take("LOG_IN_REQUEST", logIn); //로그인 이라는 액션이 실행될때까지 기다리겠다. 로그인함수를 실행할떄, 그 액션 자체가 매개변수로 전달이 됨
}
function* watchLogOut() {
  yield take("LOG_OUT_REQUEST", logOut);
}
function* watchAddPost() {
  yield take("ADD_POST_REQUEST", addPost);
}

export default function* rootSaga() {
  yield all([
    //all 은 배열을 받아서, 안에 있는걸 한방에 다 실행해. 등록을 해주는 느낌
    fork(watchLogin),
    fork(watchLogOut), //fork는 함수를 실행한단 뜻이야, call도 실행하는건데 살짝 다름
    fork(watchAddPost),
  ]);
}

//fork는 비동기함수호출 : 요청 보내버리고 결과 기다리는거 상관없이 그냥 다음거 실행 (논블로킹)
//call은 동기함수호출 : .then 쓰는 방식
