import { describe, expect, it, vi } from "vitest";
import ThreadRepository from "../../../../Domains/threads/ThreadRepository";
import CommentRepository from "../../../../Domains/comments/CommentRepository";
import DeleteCommentUseCase from "../DeleteCommentUseCase";

describe("DeleteComment use case", () => {
  it("should throw error if thread not found", async () => {
    // Arrange
    const userId = "user-1234";
    const badPayload = {};

    const mockRepository = {
      threadRepository: new ThreadRepository(),
      commentRepository: new CommentRepository(),
    };

    // create mockup method thread & comment repo
    mockRepository.threadRepository.checkThreadAvailability = vi.fn(() =>
      Promise.reject("Thread tidak ditemukan"),
    );

    mockRepository.commentRepository.checkCommentAvailability = vi.fn(() =>
      Promise.resolve(),
    );

    mockRepository.commentRepository.verifyCommentOwner = vi.fn(() =>
      Promise.resolve(),
    );

    // Action
    const useCase = new DeleteCommentUseCase(mockRepository);

    // Assert
    await expect(useCase.execute(userId, badPayload)).rejects.toThrowError(
      "Thread tidak ditemukan",
    );
  });

  it("should throw error if comment not available", async () => {
    // Arrange
    const userId = "user-1234";

    const badPayload = {};

    const mockRepository = {
      threadRepository: new ThreadRepository(),
      commentRepository: new CommentRepository(),
    };

    // create mockup method thread & comment repo
    mockRepository.threadRepository.checkThreadAvailability = vi.fn(() =>
      Promise.resolve(),
    );

    mockRepository.commentRepository.checkCommentAvailability = vi.fn(() =>
      Promise.reject("komentar tidak valid"),
    );

    mockRepository.commentRepository.verifyCommentOwner = vi.fn(() =>
      Promise.resolve(),
    );

    mockRepository.commentRepository.deleteCommentById = vi.fn(() =>
      Promise.resolve(),
    );

    // Action
    const useCase = new DeleteCommentUseCase(mockRepository);

    // Assert
    await expect(useCase.execute(userId, badPayload)).rejects.toThrow(
      "komentar tidak valid",
    );
  });

  it("should throw error if comment delete not with owner", async () => {
    // Arrange
    const userId = "user-1234";

    const badPayload = {};

    const mockRepository = {
      threadRepository: new ThreadRepository(),
      commentRepository: new CommentRepository(),
    };

    // create mockup method thread & comment repo
    mockRepository.threadRepository.checkThreadAvailability = vi.fn(() =>
      Promise.resolve(),
    );

    mockRepository.commentRepository.checkCommentAvailability = vi.fn(() =>
      Promise.resolve(),
    );

    mockRepository.commentRepository.verifyCommentOwner = vi.fn(() =>
      Promise.reject("You not have access for this comment"),
    );

    mockRepository.commentRepository.deleteCommentById = vi.fn(() =>
      Promise.resolve(),
    );

    // Action
    const useCase = new DeleteCommentUseCase(mockRepository);

    // Assert
    await expect(useCase.execute(userId, badPayload)).rejects.toThrow(
      "You not have access for this comment",
    );
  });

  it("should pass if thread comment found & delete with owner", async () => {
    // Arrange
    const userId = "user-1234";

    const payload = {
      commentId: "comment-1234",
      threadId: "thrad-1234",
    };

    const mockRepository = {
      threadRepository: new ThreadRepository(),
      commentRepository: new CommentRepository(),
    };

    // create mockup method thread & comment repo
    mockRepository.threadRepository.checkThreadAvailability = vi.fn(() =>
      Promise.resolve(),
    );

    mockRepository.commentRepository.checkCommentAvailability = vi.fn(() =>
      Promise.resolve(),
    );

    mockRepository.commentRepository.verifyCommentOwner = vi.fn(() =>
      Promise.resolve(),
    );

    mockRepository.commentRepository.deleteCommentById = vi.fn(() =>
      Promise.resolve("success"),
    );

    // Action
    const useCase = new DeleteCommentUseCase(mockRepository);

    // Assert
    await expect(useCase.execute(userId, payload)).resolves.toEqual("success");
  });
});
