import { describe, expect, it, vi } from "vitest";
import AddThreadUseCase from "../AddThreadUseCase";

describe("AddThread usecase", () => {
  it("should throw error when payload is invalid", async () => {
    // Arrange
    const invalidPayload = {};
    const userId = "user-1234";

    const mockRepository = {
      addThread: vi.fn(),
    };

    // Action
    const addThreadUseCase = new AddThreadUseCase(mockRepository);

    // Assert
    await expect(
      addThreadUseCase.execute(userId, invalidPayload),
    ).rejects.toThrowError("payload thread tidak boleh kosong");
  });

  it("should throw error when payload data type is wrong", async () => {
    // Arrange
    const payloadDataWrong = {
      title: "thread-pirw1245",
      body: ["thread124", "coba1234"],
    };

    const userId = "user-1234";

    const mockRepository = {
      addThread: vi.fn(),
    };

    // Action
    const addThreadUseCase = new AddThreadUseCase(mockRepository);

    // Assert
    await expect(
      addThreadUseCase.execute(userId, payloadDataWrong),
    ).rejects.toThrowError("payload thread tidak valid");
  });

  it("should return new thread if payload is valid", async () => {
    // Arrange
    const payloadValid = {
      title: "thread-pirw1245",
      body: "Selamat hari raya idul fitri",
    };

    const userId = "user-1234";

    const mockRepository = {
      addThread: vi.fn().mockResolvedValue(payloadValid),
    };

    // Action
    const addThreadUseCase = new AddThreadUseCase(mockRepository);

    // Assert
    await expect(
      addThreadUseCase.execute(userId, payloadValid),
    ).resolves.toEqual(payloadValid);
  });
});
