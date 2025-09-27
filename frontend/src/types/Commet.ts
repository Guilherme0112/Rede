import type { User } from "./User";

export interface Comment {
  id: number;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
  liked?: boolean;
}