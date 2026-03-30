class CommentDetail {
  constructor(payload) {
    this._verifyPayload(payload[0]);

    const { id, username, content, date, is_delete } = payload[0];

    this.id = id;
    this.username = username;
    this.content = is_delete ? "**komentar telah dihapus**" : content;
    this.date = date;
    this.is_delete = is_delete;
  }

  _verifyPayload(payload) {
    const { id, username, content, date, is_delete } = payload;

    if (!id || !username || !content || !date) {
      throw new Error("COMMENT_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof username !== "string" ||
      typeof content !== "string" ||
      typeof date !== "object" ||
      typeof is_delete !== "boolean"
    ) {
      throw new Error("COMMENT_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

export default CommentDetail;
