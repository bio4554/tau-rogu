import { Router } from "express";
import * as postsController from "../../controllers/posts.controller";

const router = Router();

router.post("/posts", postsController.create);

export default router;
