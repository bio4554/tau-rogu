import { Router } from "express";
import * as postsController from "../../controllers/posts.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/posts", auth, postsController.create);

router.get("/posts/users/:userId", auth, postsController.userPosts);

export default router;
