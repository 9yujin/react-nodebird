import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

import user from "./user";
import post from "./post";

//(이전상태 , 액션) => 다음상태
const rootReducer = combineReducers({ //인덱스, 유저, 포스트 세개 합친겨
  index: (state = {}, action) => {
    switch (action.type) {          //HYDRATE를 위해서 인덱스 리듀서 하나 추가한거임.(서버사이드렌더링)
      case HYDRATE:
        console.log("HYDRATE", action);
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
