import { describe, expect, it, vi } from "vitest";
import UserRepository from "../../../../Domains/users/UserRepository";
import ThreadRepository from "../../../../Domains/threads/ThreadRepository";
import CommentRepository from "../../../../Domains/comments/CommentRepository";
import AddedReplyUseCase from "../AddedReplyUseCase";
import RepliesRepository from "../../../../Domains/replies/RepliesRepository";

describe("AddedReply use case", () => {
  it("should throw error when payload is empty", async () => {
    // Arrange
    const commentId = "comment-12345";
    const threadId = "thread-12345";
    const username = "testing-user";

    const emptyPayload = {};

    const mockRepository = {
      userRepository: new UserRepository(),
      threadRepository: new ThreadRepository(),
      commentRepository: new CommentRepository(),
    };

    mockRepository.userRepository.getUsername = vi.fn(() => Promise.resolve());

    mockRepository.userRepository.verifyAvailableUsername = vi.fn(() =>
      Promise.resolve(),
    );

    mockRepository.threadRepository.checkThreadAvailability = vi.fn(() =>
      Promise.resolve(),
    );

    mockRepository.commentRepository.checkCommentAvailability = vi.fn(() =>
      Promise.resolve(),
    );

    // Action
    const useCase = new AddedReplyUseCase(mockRepository);

    // Assert
    await expect(
      useCase.execute(username, commentId, threadId, emptyPayload),
    ).rejects.toThrowError("payload added reply tidak boleh kosong");
  });

  it("should throw error when payload is bad data type", async () => {
    // Arrange
    const commentId = "comment-12345";
    const threadId = "thread-12345";
    const username = "testing-user";

    const emptyPayload = {
      content: 12345,
      commentId: [],
      owner: "ono purbo",
      threadId: 7790,
    };

    const mockRepository = {
      userRepository: new UserRepository(),
      threadRepository: new ThreadRepository(),
      commentRepository: new CommentRepository(),
    };

    mockRepository.userRepository.getUsername = vi.fn(() => Promise.resolve());

    mockRepository.userRepository.verifyAvailableUsername = vi.fn(() =>
      Promise.resolve(),
    );

    mockRepository.threadRepository.checkThreadAvailability = vi.fn(() =>
      Promise.resolve(),
    );

    mockRepository.commentRepository.checkCommentAvailability = vi.fn(() =>
      Promise.resolve(),
    );

    // Action
    const useCase = new AddedReplyUseCase(mockRepository);

    // Assert
    await expect(
      useCase.execute(username, commentId, threadId, emptyPayload),
    ).rejects.toThrowError("payload added reply tidak valid");
  });

  it("should return new reply", async () => {
    // Arrange
    const commentId = "comment-12345";
    const threadId = "thread-12345";
    const username = "testing-user";

    const payload = {
      content: "hidup jokowi",
      commentId: commentId,
      owner: username,
      threadId: threadId,
    };

    const mockRepository = {
      userRepository: new UserRepository(),
      threadRepository: new ThreadRepository(),
      commentRepository: new CommentRepository(),
      repliesRepository: new RepliesRepository(),
    };

    mockRepository.userRepository.getUsername = vi.fn(() => Promise.resolve());

    mockRepository.userRepository.verifyAvailableUsername = vi.fn(() =>
      Promise.resolve(),
    );

    mockRepository.threadRepository.checkThreadAvailability = vi.fn(() =>
      Promise.resolve(),
    );

    mockRepository.commentRepository.checkCommentAvailability = vi.fn(() =>
      Promise.resolve(),
    );

    mockRepository.repliesRepository.addReply = vi.fn(() =>
      Promise.resolve(payload, username),
    );

    // Action
    const useCase = new AddedReplyUseCase(mockRepository);

    // Assert
    await expect(
      useCase.execute(username, commentId, threadId, payload),
    ).resolves.toBe(payload);
  });
});
