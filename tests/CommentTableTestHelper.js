import pool from "../src/Infrastructures/database/postgres/pool";

const CommentTableTestHelper = {
  async addComment(userId, threadId, commentId, comment) {
    const { content, date } = comment;

    const result = await pool.query(
      "INSERT INTO comments VALUES($1, $2, $3, $4, $5) RETURNING id, content, owner",
      [commentId, content, userId, threadId, date],
    );

    return result.rows[0];
  },

  async clearTable() {
    await pool.query("DELETE FROM comments ");
  },
};

export default CommentTableTestHelper;
