module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image", //자동으로 users로 이름이 바뀌어서 sql에 테이블 생성됨
    {
      src: {
        type: DataTypes.STRING(200), //url이라 길이가 길어질수있음
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", //한글 ㄱㄴ, 이모티콘까지
    }
  );
  Image.associate = (db) => {
      db.Image.belongsTo(db.Post);
  };
  return Image;
};
