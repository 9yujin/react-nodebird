const passport = require("passport");
const local = require("./local");
const { User } = require("../models");
module.exports = () => {
  passport.serializeUser((user, done) => {
    //세션에 담을때
    done(null, user.id); //쿠키랑 묶어줄 id만 저장
  });

  passport.deserializeUser(async (id, done) => {
    //복원할때
    try {
      await User.findOne({ where: { id } });
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
