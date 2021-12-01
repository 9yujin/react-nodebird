module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User", //자동으로 users로 이름이 바뀌어서 sql에 테이블 생성됨
    {
      //id가 기본적으로 들어있다ㅣ.
      email: {
        type: DataTypes.STRING(30), //조건검사.. 문자열 & 30글자 이내
        allowNull: false, //필수
        unique: true, //고유한 값
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", //한글 ㄱㄴ
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" }); //좋아요관계 as:별칭
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "followingId",
    }); //뽀륀키 : 먼저찾는거,,
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "followerId",
    }); //나를 먼저 찾으니까
  };
  return User;
};
