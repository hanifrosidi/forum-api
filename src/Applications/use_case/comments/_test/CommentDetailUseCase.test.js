/* eslint-disable camelcase */
import { describe, expect, it, vi } from "vitest";
import ThreadRepository from "../../../../Domains/threads/ThreadRepository";
import CommentRepository from "../../../../Domains/comments/CommentRepository";
import CommentDetailUseCase from "../CommentDetailUseCase";
import CommentDetail from "../../../../Domains/comments/entities/CommentDetail";

describe("CommentDetail use case", () => {
  it("should throw error if no threadId & commentId", async () => {
    // mock repository
    const mockRepository = {
      threadRepository: new ThreadRepository(),
      commentRepository: new CommentRepository(),
    };

    // mocking function repository
    mockRepository.threadRepository.checkThreadAvailability = vi.fn(() =>
      Promise.resolve(),
    );
    mockRepository.commentRepository.checkCommentAvailability = vi.fn(() =>
      Promise.resolve(),
    );

    mockRepository.commentRepository.getCommentsByThreadId = vi.fn(() =>
      Promise.resolve(),
    );

    // Action
    const useCase = new CommentDetailUseCase(mockRepository);

    // Assert
    await expect(useCase.execute()).rejects.toThrowError(
      "comment detail tidak memiliki thread dan comment spesifik",
    );
  });

  it("should throw error if thread not found", async () => {
    // Arrange
    const fakeThread = "thread-fake";
    const commentId = "comment-123";

    // mock repository
    const mockRepository = {
      threadRepository: new ThreadRepository(),
      commentRepository: new CommentRepository(),
    };

    // mocking function repository
    mockRepository.threadRepository.checkThreadAvailability = vi.fn(() =>
      Promise.reject("Thread tidak ditemukan"),
    );
    mockRepository.commentRepository.checkCommentAvailability = vi.fn(() =>
      Promise.resolve(),
    );

    mockRepository.commentRepository.getCommentsByThreadId = vi.fn(() =>
      Promise.resolve(),
    );

    // Action
    const useCase = new CommentDetailUseCase(mockRepository);

    // Assert
    await expect(useCase.execute(fakeThread, commentId)).rejects.toThrowError(
      "Thread tidak ditemukan",
    );
  });

  it("should throw error if comment not available", async () => {
    // Arrange
    const threadId = "thread-123";
    const fakeCommand = "comment-fake";

    // mock repository
    const mockRepository = {
      threadRepository: new ThreadRepository(),
      commentRepository: new CommentRepository(),
    };

    // mocking function repository
    mockRepository.threadRepository.checkThreadAvailability = vi.fn(() =>
      Promise.resolve(),
    );
    mockRepository.commentRepository.checkCommentAvailability = vi.fn(() =>
      Promise.reject("komentar tidak ditemukan"),
    );

    mockRepository.commentRepository.getCommentsByThreadId = vi.fn(() =>
      Promise.resolve(),
    );

    // Action
    const useCase = new CommentDetailUseCase(mockRepository);

    // Assert
    await expect(useCase.execute(threadId, fakeCommand)).rejects.toThrowError(
      "komentar tidak ditemukan",
    );
  });

  it("should return commentDetail if all scenario is passed", async () => {
    // Arrange
    const threadId = "thread1234";
    const commentId = "comment1234";

    const payloadDetail = [
      {
        id: "comment-123",
        username: "foobar",
        content: "komentar pertama nih!",
        date: new Date(),
        likeCount: 0,
        // eslint-disable-next-line camelcase
        is_delete: true,
      },
    ];

    // mock repository
    const mockRepository = {
      threadRepository: new ThreadRepository(),
      commentRepository: new CommentRepository(),
    };

    // mocking function repository
    mockRepository.threadRepository.checkThreadAvailability = vi.fn(() =>
      Promise.resolve(),
    );
    mockRepository.commentRepository.checkCommentAvailability = vi.fn(() =>
      Promise.resolve(),
    );

    mockRepository.commentRepository.getCommentsByThreadId = vi.fn(() =>
      Promise.resolve(payloadDetail),
    );

    // Action
    const useCase = new CommentDetailUseCase(mockRepository);

    // Assert
    await expect(useCase.execute(threadId, commentId)).resolves.instanceOf(
      CommentDetail,
    );

    await expect(useCase.execute(threadId, commentId)).resolves.toMatchObject({
      content: expect.any(String),
      date: expect.any(Object),
      id: expect.any(String),
      is_delete: expect.any(Boolean),
      username: expect.any(String),
    });
  });
});
