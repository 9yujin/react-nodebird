//로그인했는지 안했는지 검사하는 미들웨어,,

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next(); //next() : 다음 미들웨어로 감.. next(asdfasfd_) : 안에 뭘 넣으면 에러처리.
  } else {
    res.status(401).send("로그인이 필요합니다");
  }
};
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next(); //next() : 다음 미들웨어로 감.. next(asdfasfd_) : 안에 뭘 넣으면 에러처리.
  } else {
    res.status(401).send("로그인이 필요합니다");
  }
};

//그냥 코드 안에 넣어도 되는데 굳이 미들웨어로 빼는이유는 -> 중복을 제거하기 위해!
