import express from "express";
import authenticationMiddleware from "../../middlewares/authenticationMiddleware.js";
import comments from "../comments/index.js";
import createCommentsRouter from "../comments/routes.js";

const createThreadsRouter = (threadController, container) => {
  const router = express.Router({ mergeParams: true });

  router.post(
    "/",
    authenticationMiddleware(container),
    threadController.addThreadController,
  );

  router.get("/:threadId", threadController.getThreadCommentController);

  router.use("/:threadId/comments", comments(container));

  return router;
};

export default createThreadsRouter;
