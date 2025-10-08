import type { User } from "./User";

export interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
  liked?: boolean;
}