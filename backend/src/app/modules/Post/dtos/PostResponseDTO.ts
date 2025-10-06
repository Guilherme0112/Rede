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
    this.comments = post.comments?.map((c: any) => ({
      id: c._id.toString(),
      user: {
        id: c.user._id.toString(),
        nome: c.user.nome,
        avatar: c.user.avatar,
        email: c.user.email,
      },
      content: c.content,
      timestamp: c.timestamp,
      likes: c.likes,
      liked: c.liked,
    })) || [];
  }
}
