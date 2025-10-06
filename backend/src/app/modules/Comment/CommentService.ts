import { Comment } from "./Comment.model";

export class CommentService {

    async getAll() {
        return await Comment.find();
    }
}