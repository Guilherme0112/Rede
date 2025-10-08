import { Post } from "../Post/Post.model";
import { Comment } from "./Comment.model";
import { CommentResponseDTO } from "./dtos/CommentResponseDTO";
import { NewCommentDTO } from "./dtos/NewCommentDTO";

export class CommentService {

    async getByPost(id: string): Promise<CommentResponseDTO[]> {
        const comments = await Comment.find({ post: id })
            .populate('user', 'name avatar')
            .populate('post', 'title');
        return comments.map(comment => new CommentResponseDTO(comment));
    }

    async createComment(data: NewCommentDTO): Promise<CommentResponseDTO> {
        if (!data.user || !data.post || !data.content)
            throw new Error("user, post e content são obrigatórios.");

        // cria o comentário
        const comment = await Comment.create({
            user: data.user,
            post: data.post,
            content: data.content,
        });

        // adiciona o comentário no post
        await Post.findByIdAndUpdate(
            data.post,
            { $push: { comments: comment._id } },
            { new: true }
        );

        // popula o user e retorna o DTO
        const populated = await comment.populate('user', 'name avatar');
        return new CommentResponseDTO(populated);
    }

    async deleteComment(id: string): Promise<void> {
        if (!id) throw new Error("ID do comentário é obrigatório");

        const deletedComment = await Comment.findByIdAndDelete(id);
        if (!deletedComment) throw new Error("Comentário não encontrado");
    }

}