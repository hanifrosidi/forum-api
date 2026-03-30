import { describe, expect, it } from "vitest";
import CommentDetail from "../CommentDetail";

describe("CommentDetail entities", () => {
  it("should throw error when payload not contain needed property", () => {
    // Arrange
    const payload = [
      {
        id: "123",
        username: "foobar",
      },
    ];

    // Action & Assert
    expect(() => new CommentDetail(payload)).toThrowError(
      "COMMENT_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY",
    );
  });

  it("should throw error when payload does not meet data type requirements", () => {
    // Arrange
    const payload = [
      {
        id: "comment-123",
        username: "foobar",
        content: "a comment",
        date: 321,
        replies: "some replies",
        likeCount: 0,
      },
    ];

    // Action & Assert
    expect(() => new CommentDetail(payload)).toThrowError(
      "COMMENT_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION",
    );
  });

  it("should create CommentDetail entities correctly", () => {
    // Arrange
    const payload = [
      {
        id: "comment-123",
        username: "foobar",
        content: "a comment",
        date: new Date(),
        likeCount: 0,
        is_delete: false,
      },
    ];

    // Action
    const commentDetail = new CommentDetail(payload);

    // Assert
    expect(commentDetail).toBeInstanceOf(CommentDetail);
    expect(commentDetail.id).toEqual(payload[0].id);
    expect(commentDetail.username).toEqual(payload[0].username);
    expect(commentDetail.content).toEqual(payload[0].content);
    expect(commentDetail.replies).toEqual(payload[0].replies);
    expect(commentDetail.date).toEqual(payload[0].date);
  });

  it("should create deleted CommentDetail entities correctly", () => {
    // Arrange
    const payload = [
      {
        id: "comment-123",
        username: "foobar",
        content: "a comment",

        date: new Date(),
        likeCount: 0,
        is_delete: true,
      },
    ];

    // Action
    const commentDetail = new CommentDetail(payload);

    // Assert
    expect(commentDetail).toBeInstanceOf(CommentDetail);
    expect(commentDetail.id).toEqual(payload[0].id);
    expect(commentDetail.username).toEqual(payload[0].username);
    expect(commentDetail.content).toEqual("**komentar telah dihapus**");
    expect(commentDetail.replies).toEqual(payload[0].replies);
    expect(commentDetail.date).toEqual(payload[0].date);
  });
});
