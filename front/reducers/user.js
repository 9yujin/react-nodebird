const dummyUser = {
  id: 1,
  nickname: "제로초",
  Posts: [],
  Followings: [],
  Followers: [],
};

export const initialState = {
  isLoggedIn: false,
  user: null,
  signUpData: {},
  loginData: {},
};

export const SIGN_UP = "SIGN_UP";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const LOG_IN = "LOG_IN"; // 액션의 이름
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS"; // 액션의 이름
export const LOG_IN_FAILURE = "LOG_IN_FAILURE"; // 액션의 이름
export const LOG_OUT = "LOG_OUT";

export const signUpAction = (data) => {
  return {
    type: SIGN_UP,
    data,
  };
};

export const signUpSuccess = {
  type: SIGN_UP_SUCCESS,
};

export const loginRequestAction = (data) => {
  return {
    type: "LOG_IN_REQUEST",
    data,
  };
};
export const logoutRequestAction = () => {
  return {
    type: "LOG_OUT_REQUEST",
  };
};
export const signUp = (data) => {
  return {
    type: SIGN_UP,
    data,
  };
};

export default (state = initialState, action) => {
  //하나의 상태를 건드는 여러개의 액션들,, -> 상태 하나를 하나의 리듀서로 분리해
  switch (action.type) {
    case LOG_IN: {
      return {
        ...state,
        isLoggedIn: true,
        user: dummyUser,
        loginData: action.data,
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }
    case SIGN_UP: {
      return {
        ...state,
        signUpData: action.data,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
