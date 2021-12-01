module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment", //자동으로 users로 이름이 바뀌어서 sql에 테이블 생성됨
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      //belongsTo가 있으면, 밑의 두개 컬럼을 만들어줌..어디에 속한 데이터인지.
      //UserId: {}
      //PostId: {}
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", //한글 ㄱㄴ, 이모티콘까지
    }
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};
