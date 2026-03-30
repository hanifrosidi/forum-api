import { describe, expect, it, vi } from "vitest";
import AddCommentUseCase from "../AddCommentUseCase";
import CommentRepository from "../../../../Domains/comments/CommentRepository";
import ThreadRepository from "../../../../Domains/threads/ThreadRepository";

describe("AddComment use case", () => {
  it("should throw error when thread not available", async () => {
    // Arrange
    const userId = "user-12345";
    const fakeThread = "fake-thread";

    const emptyPayload = {};

    const mockRepository = {
      commentRepository: new CommentRepository(),
      threadRepository: new ThreadRepository(),
    };

    // mooking for thread check
    mockRepository.threadRepository.checkThreadAvailability = vi.fn(() =>
      Promise.reject("Thread tidak ditemukan"),
    );
    mockRepository.commentRepository.addComment = vi.fn(() =>
      Promise.resolve(),
    );

    // Action
    const useCase = new AddCommentUseCase(mockRepository);

    // Assert
    await expect(
      useCase.execute(userId, fakeThread, emptyPayload),
    ).rejects.toThrowError("Thread tidak ditemukan");
  });

  it("should throw error when payload is empty", async () => {
    // Arrange
    const userId = "user-12345";
    const threadId = "thread-12345";

    const emptyPayload = {};

    const mockRepository = {
      commentRepository: new CommentRepository(),
      threadRepository: new ThreadRepository(),
    };

    // mooking for thread check
    mockRepository.threadRepository.checkThreadAvailability = vi.fn(() =>
      Promise.resolve(),
    );
    mockRepository.commentRepository.addComment = vi.fn(() =>
      Promise.resolve(),
    );

    // Action
    const useCase = new AddCommentUseCase(mockRepository);

    // Assert
    await expect(
      useCase.execute(userId, threadId, emptyPayload),
    ).rejects.toThrowError("payload comment tidak boleh kosong");
  });

  it("should throw error when payload is bad data type", async () => {
    // Arrange
    const userId = "user-12345";
    const threadId = "thread-12345";

    const emptyPayload = {
      content: ["jokowi", "dodol"],
    };

    const mockRepository = {
      commentRepository: new CommentRepository(),
      threadRepository: new ThreadRepository(),
    };

    // mooking for thread check
    mockRepository.threadRepository.checkThreadAvailability = vi.fn(() =>
      Promise.resolve(),
    );
    mockRepository.commentRepository.addComment = vi.fn(() =>
      Promise.resolve(),
    );

    // Action
    const useCase = new AddCommentUseCase(mockRepository);

    // Assert
    await expect(
      useCase.execute(userId, threadId, emptyPayload),
    ).rejects.toThrowError("payload comment tidak valid");
  });

  it("should return new comment if all scenario is passed", async () => {
    // Arrange
    const userId = "user-12345";
    const threadId = "thread-12345";

    const payload = {
      content: "Thread kamu sangat berkualitas",
    };

    const expectedResult = {
      id: "comment-123",
      content: payload.content,
      owner: userId,
    };

    const mockRepository = {
      commentRepository: new CommentRepository(),
      threadRepository: new ThreadRepository(),
    };

    // mooking for thread check
    mockRepository.threadRepository.checkThreadAvailability = vi.fn(() =>
      Promise.resolve(),
    );
    mockRepository.commentRepository.addComment = vi.fn(() =>
      Promise.resolve(expectedResult),
    );

    // Action
    const useCase = new AddCommentUseCase(mockRepository);
    const result = await useCase.execute(userId, threadId, payload);

    // Assert
    expect(result).toEqual(expectedResult);
    expect(mockRepository.commentRepository.addComment).toHaveBeenCalledWith(
      userId,
      threadId,
      payload,
    );
  });
});
