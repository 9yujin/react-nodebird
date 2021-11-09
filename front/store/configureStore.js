import { applyMiddleware, createStore, compose } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "@redux-saga/core";
import reducer from "../reducers";
import rootSaga from "../sagas/";

const loggerMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log(action);
    return next(action);
  };

const configureStore = (context) => {
  const sagaMiddleware = createSagaMiddleware(); //사가
  const middlewares = [sagaMiddleware, loggerMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production" //개발용인지 아닌지
      ? compose(applyMiddleware(...middlewares)) //배포용일때
      : composeWithDevTools(
          //개발용일때,, devtool을 넣음. 이런건 nextjs 쓸때만 하는건가??
          applyMiddleware(...middlewares)
        );
  const store = createStore(reducer, enhancer); //스토어ㄹ 가와

  store.sagaTask = sagaMiddleware.run(rootSaga);
  사가;
  return store;
};

const wrapper = createWrapper(configureStore, { debug: process.env.NODE_ENV === "development" });

export default wrapper;
