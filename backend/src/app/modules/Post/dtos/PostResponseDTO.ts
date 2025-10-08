import { CommentResponseDTO } from "../../Comment/dtos/CommentResponseDTO";
import { UserResponseDTO } from "../../User/dtos/UserResponseDTO";

export class PostResponseDTO {
  id: string;
  user: UserResponseDTO;
  content: string;
  timestamp: Date;
  likes: number;
  retweets: number;
  comments: CommentResponseDTO[];

  constructor(post: any) {
    this.id = post._id.toString();
    this.user = new UserResponseDTO(post.user);
    this.content = post.content;
    this.timestamp = post.timestamp;
    this.likes = post.likes;
    this.retweets = post.retweets;
    this.comments = post.comments?.map((c: any) => new CommentResponseDTO(c)) || [];
  }
}
