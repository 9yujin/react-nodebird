import { applyMiddleware, createStore, compose } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from '../reducers';

const configureStore = (context) => {
  console.log(context);
  const middlewares = [];
  const enhancer = process.env.NODE_ENV === 'production' //개발용인지 아닌지
    ? compose(applyMiddleware(...middlewares))  //배포용일때
    : composeWithDevTools(                      //개발용일때,, devtool을 넣음. 이런건 nextjs 쓸때만 하는건가??
      applyMiddleware(...middlewares),
    );
  const store = createStore(reducer, enhancer); //스토어ㄹ 가와
  return store;
};

const wrapper = createWrapper(configureStore, { debug: process.env.NODE_ENV === 'development' });

export default wrapper;
