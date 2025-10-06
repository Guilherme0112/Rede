import { UserResponseDTO } from "../../User/dtos/UserResponseDTO";

export class CommentResponseDTO {
  id: string;
  user: UserResponseDTO;
  content: string;
  timestamp: Date;
  likes: number;
  liked: boolean;

  constructor(comment: any) {
    this.id = comment._id.toString();
    this.user = comment.user;
    this.content = comment.content;
    this.timestamp = comment.timestamp;
    this.likes = comment.likes;
    this.liked = comment.liked;
  }
}
