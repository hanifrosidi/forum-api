/* eslint-disable camelcase */
import { describe, expect, it, vi } from "vitest";
import ThreadDetailUseCase from "../ThreadDetailUseCase";
import ThreadRepository from "../../../../Domains/threads/ThreadRepository";
import CommentRepository from "../../../../Domains/comments/CommentRepository";
import RepliesRepository from "../../../../Domains/replies/RepliesRepository";
import ThreadDetail from "../../../../Domains/threads/entities/ThreadDetail";
import CommentLikeRepository from "../../../../Domains/likes/CommentLikesRepository";

describe("ThreadDetail use case", () => {
  it("should throw error when ThreadDetail validation fails", async () => {
    // Arrange
    const threadId = "thread-123";

    const invalidPayload = {};

    const mockRepository = {
      threadRepository: new ThreadRepository(),
      commentRepository: new CommentRepository(),
      repliesRepository: new RepliesRepository(),
      commentLikeRepository: new CommentLikeRepository(),
    };

    mockRepository.threadRepository.getThreadById = vi.fn(() =>
      Promise.resolve(invalidPayload),
    );

    mockRepository.commentRepository.getCommentsByThreadId = vi.fn(() =>
      Promise.resolve([]),
    );

    mockRepository.repliesRepository.getRepliesByThreadId = vi.fn(() =>
      Promise.resolve(),
    );

    mockRepository.commentLikeRepository.getLikesByThreadId = vi.fn(() =>
      Promise.resolve(),
    );

    // Action
    const useCase = new ThreadDetailUseCase(mockRepository);
    await expect(useCase.execute(threadId)).rejects.toThrowError(
      "THREAD_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY",
    );
  });

  it("should throw error when ThreadDetail data type is invalid", async () => {
    // Arrange
    const threadId = "thread-123";
    const threadData = {
      id: threadId,
      title: "ini adalah thread",
      body: "selamat hari raya idul fitri",
      date: "2021-08-08T07:22:33.555Z",
      username: "user-12345",
      comments: "wrong comment",
    };

    const mockRepository = {
      threadRepository: new ThreadRepository(),
      commentRepository: new CommentRepository(),
      repliesRepository: new RepliesRepository(),
      commentLikeRepository: new CommentLikeRepository(),
    };

    mockRepository.threadRepository.getThreadById = vi.fn(() =>
      Promise.resolve(threadData),
    );

    mockRepository.commentRepository.getCommentsByThreadId = vi.fn(() =>
      Promise.resolve(threadData.comments),
    );

    mockRepository.repliesRepository.getRepliesByThreadId = vi.fn(() =>
      Promise.resolve(),
    );

    mockRepository.commentLikeRepository.getLikesByThreadId = vi.fn(
      () => Promise.resolve,
    );

    // Action
    const useCase = new ThreadDetailUseCase(mockRepository);

    // Assert
    await expect(useCase.execute(threadId)).rejects.toThrowError(
      "THREAD_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION",
    );
  });

  it("should return thradDetail if payload is valid", async () => {
    // Arrange
    const threadId = "thread-123";
    const threadData = {
      id: threadId,
      title: "ini adalah thread",
      body: "selamat hari raya idul fitri",
      date: "2021-08-08T07:22:33.555Z",
      username: "user-12345",
      comments: [
        {
          id: "comment-_pby2_tmXV6bcvcdev8xk",
          username: "johndoe",
          date: new Date(),
          content: "sebuah comment",
          likeCount: [
            {
              id: "like-1234",
              comment: "comment-1234",
              owner: "user-12344",
            },
          ],
          replies: [
            {
              id: "reply-1234",
              content: "ini content contoh",
              date: new Date().toISOString(),
              comment: "comment-_pby2_tmXV6bcvcdev8xk",
              username: "johndoe",
              id_delete: false,
            },
          ],
          is_delete: false,
        },
      ],
    };

    const mockRepository = {
      threadRepository: new ThreadRepository(),
      commentRepository: new CommentRepository(),
      repliesRepository: new RepliesRepository(),
      commentLikeRepository: new CommentLikeRepository(),
    };

    mockRepository.threadRepository.getThreadById = vi.fn(() =>
      Promise.resolve(threadData),
    );

    mockRepository.commentRepository.getCommentsByThreadId = vi.fn(() =>
      Promise.resolve(threadData.comments),
    );

    mockRepository.repliesRepository.getRepliesByThreadId = vi.fn(() =>
      Promise.resolve(threadData.comments[0].replies),
    );

    mockRepository.commentLikeRepository.getLikesByThreadId = vi.fn(() =>
      Promise.resolve(threadData.comments[0].likeCount),
    );
    // Action
    const useCase = new ThreadDetailUseCase(mockRepository);

    // Assert
    await expect(useCase.execute(threadId)).resolves.toBeInstanceOf(
      ThreadDetail,
    );
  });
});
