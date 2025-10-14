import type { Comment } from "./Commet";
import type { User } from "./User";

export interface Post {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
  retweets: number;
  comments: Comment[];
}
