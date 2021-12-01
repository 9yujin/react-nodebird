module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post", //자동으로 users로 이름이 바뀌어서 sql에 테이블 생성됨
    {
      content: {
        type: DataTypes.TEXT, //DataTypes.STRING(140).. 일케하면 140자 제한
        allowNull: false,
      },
    },
    //RetweetId
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", //한글 ㄱㄴ, 이모티콘까지
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" }); //Post.getLikers 따위로 쓸수 있다했음 쓰루는 컬럼이름
    db.Post.belongsTo(db.Post, { as: "Retweet" });
  };
  return Post;
};
