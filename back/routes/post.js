const express = require("express");
const { Post } = require("../models");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id, //passport의 deserialized..뭐시기에서 오는거래
    });
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
        },
        {
          model: User,
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/:postId/comment", async (req, res) => {
  // :postId -> 파라미터. 동적으로 바뀌는 부분
  // /post//coment
  //post는 app.js에서 분리시켜둠
  try {
    const post = await Post.findOne({
      //해당 게시글이 있나 확인
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId, //파라미터는 이렇게 접근 ㄱㄴ
      UserId: req.user.id,
    });
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/", (req, res) => {});
module.exports = router;
