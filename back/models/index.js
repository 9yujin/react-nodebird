const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development"; //환경변수에 아무것도 없으면 개발모드
const config = require("../config/config")[env]; //json 가져온거에다가 [development] 부분..
db = {};
//시퀄라이즈와 mysql을 연결해줌
const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.Comment = require("./comment")(sequelize, Sequelize);
db.Hashtag = require("./hashtag")(sequelize, Sequelize);
db.Image = require("./image")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);

//요부분은 불러온 것들 안에 있는 associate 반복문 돌면서 다 실행해주는 것.
//시퀄라이즈의 모델들 등록
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
