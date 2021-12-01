module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    "Hashtag", //자동으로 users로 이름이 바뀌어서 sql에 테이블 생성됨
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", //한글 ㄱㄴ, 이모티콘까지
    }
  );
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });
  };
  return Hashtag;
};
