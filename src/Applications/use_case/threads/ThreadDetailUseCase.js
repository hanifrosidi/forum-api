import DomainErrorTranslator from "../../../Commons/exceptions/DomainErrorTranslator.js";
import CommentDetail from "../../../Domains/comments/entities/CommentDetail.js";
import ThreadDetail from "../../../Domains/threads/entities/ThreadDetail.js";

class ThreadDetailUseCase {
  constructor({ threadRepository, commentRepository, repliesRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._replyRepository = repliesRepository;
  }

  async execute(threadId) {
    try {
      const threadDetail = await this._threadRepository.getThreadById(threadId);

      const threadComments =
        await this._commentRepository.getCommentsByThreadId(threadId);

      const commentReply =
        await this._replyRepository.getRepliesByThreadId(threadId);

      if (threadDetail) {
        new ThreadDetail(threadDetail);
      }

      if (threadComments) {
        new CommentDetail(threadComments);
      }

      threadDetail.comments = threadComments.map((comment) => ({
        id: comment.id,
        username: comment.username,
        date: comment.date,
        content: comment.is_delete
          ? "**komentar telah dihapus**"
          : comment.content,
        replies: commentReply
          .filter((reply) => reply.comment === comment.id)
          .map((reply) => ({
            id: reply.id,
            content: reply.is_delete
              ? "**balasan telah dihapus**"
              : reply.content,
            date: reply.date,
            username: reply.owner,
          })),
      }));

      return new ThreadDetail(threadDetail);
    } catch (error) {
      const getError = DomainErrorTranslator.translate(error);
      throw getError;
    }
  }
}

export default ThreadDetailUseCase;
