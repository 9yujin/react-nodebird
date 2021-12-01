const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");

const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const app = express();
const db = require("./models");
const passportConfig = require("./passport");
dotenv.config();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

passportConfig();

app.use(
  cors({
    origin: "http://localhost:3060",//credentials true를 하면 오리진 꼭 적어줘야됨 (보안 철저히)
    credentials: true, //쿠키까지 전달
  })
);

app.use(express.json()); //json으로 들어오는 데이터를 req.body로 받아줌
app.use(express.urlencoded({ extended: true })); //form submit으로 들어오는 데이터를 req.body로 넣어줌

app.use(cookieParser("nodebirdsecret"));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  //method(url, callback)
  res.send("hello express");
});

//라우터 분리.. 중복되는것들 앞으로 뽑아줌. 다 post가 주소에 붙어서 요청들어가는거임
app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(3065, () => {
  console.log("서버 실행 중");
});
