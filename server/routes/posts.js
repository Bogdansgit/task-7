import express from "express";

import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  AddLikeToPost,
  RemoveLikeFromPost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", AddLikeToPost);
router.delete("/:id/like", RemoveLikeFromPost);

export default router;
