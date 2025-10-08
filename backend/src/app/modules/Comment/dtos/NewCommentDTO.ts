export class NewCommentDTO {
  user: string;
  content: string;
  post: string;

  constructor(comment: any) {
    this.user = comment.user;
    this.content = comment.content;
    this.post = comment.post;
  }
}
