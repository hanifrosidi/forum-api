import pool from "../src/Infrastructures/database/postgres/pool";

const CommentLikeTableHelper = {
  async addLikes(likeId, commentId, owner) {
    await pool.query("INSERT INTO likes VALUES($1, $2, $3)", [
      likeId,
      commentId,
      owner,
    ]);
  },

  async clearTable() {
    await pool.query("DELETE FROM likes");
  },
};

export default CommentLikeTableHelper;
