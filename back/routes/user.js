const express = require("express");
const bcrypt = require("bcrypt");
const { User, Post } = require("../models"); //구조분해 할당으로 /models/user에 있는 db.User를 빼온거야
const passport = require("passport");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

router.get("/", async (rea, res, next) => {
  try {
    if (req.user) {
      const user = await User.findOne({
        where: { id: req.user.id },
      });

      res.status(200).json(user);
    } else {
      res.status(200).json(null);
    }
  } catch (Error) {
    console.error(error);
    next(error);
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  //isnotloggedin 이라는 미들웨어를 만들어서 넣어줌
  //미들웨어 확장
  passport.authenticate("local", (err, user, info) => {
    //로그인 전략이 실행
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      //아무 에러 없으면
      if (loginErr) {
        //혹시모르니까
        console.error(loginErr);
        return next(loginErr);
      }
      //me에 넣을것들
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post,
          },
          {
            model: User,
            as: "Followings",
          },
          {
            model: User,
            as: "Followers",
          },
        ],
      });
      console.log("이거", fullUserWithoutPassword);
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/logout", isLoggedIn, (req, res, next) => {
  req.logout(); //이런게 있누
  req.session.destroy(); //세션에 저장된 쿠키와 아이디 없애기
  res.send("ok");
});

router.post("/", isNotLoggedIn, async (req, res) => {
  try {
    const exUser = await User.findOne({
      //이메일 중복 확인. 없으면 null
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다."); //끊어
    }
    const hashedPassrod = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassrod,
    });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error); //status500 (서버측에서 오류는 500)
  }
});

module.exports = router;
