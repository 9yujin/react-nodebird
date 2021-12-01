const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local"); //localstrategy 라는 이름으로 구조분해 할당
const bcrypt = require("bcrypt");
const { User } = require("../models");

module.exports = () => {
  passport.use(
    //첫번쨰 인자: 객체, 두번째 인자 : 함수(로그인전략)
    new LocalStrategy(
      {
        usernameField: "email", //req.body.email 이니까.. 이 값이 이거다 라고 패스포트한테 알려주는거임
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({
            where: { email },
          });
          if (!user) {
            return done(null, false, { reason: "존재하지 않는 사용자입니다!" }); //done : 콜백같은거 (서버에러, 성공, 클라이언트에러) => 이게 라우터로 다시 전달됨(routes/user 실행한 함수)
          }
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            return done(null, user); //두번째 인자: 성공,, 사용자 정보를 넘겨줌
          }
          return done(null, false, { reason: "비밀번호가 틀렸습니다" });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
