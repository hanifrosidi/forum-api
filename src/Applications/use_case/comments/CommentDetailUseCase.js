import DomainErrorTranslator from "../../../Commons/exceptions/DomainErrorTranslator";
import CommentDetail from "../../../Domains/comments/entities/CommentDetail";

class CommentDetailUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(threadId, commentId) {
    try {
      if (!threadId || !commentId) {
        throw new Error(
          "comment detail tidak memiliki thread dan comment spesifik",
        );
      }

      await this._threadRepository.checkThreadAvailability(threadId);
      await this._commentRepository.checkCommentAvailability(
        commentId,
        threadId,
      );

      const commentDetail =
        await this._commentRepository.getCommentsByThreadId(threadId);

      return new CommentDetail(commentDetail);
    } catch (error) {
      const getError = DomainErrorTranslator.translate(error);
      throw getError;
    }
  }
}

export default CommentDetailUseCase;
