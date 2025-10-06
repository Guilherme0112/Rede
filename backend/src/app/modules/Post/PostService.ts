import { NewPostDTO } from "./dtos/NewPostDTO";
import { PostResponseDTO } from "./dtos/PostResponseDTO";
import { Post } from "./Post.model";

export class PostService {

    async getAll(): Promise<PostResponseDTO[]> {
        const posts = await Post.find().populate('user').populate('comments');
        return posts.map(post => new PostResponseDTO(post));
    }

    async createPost(data: NewPostDTO): Promise<PostResponseDTO> {
        if (data == null) throw new Error("O post não pode ser nulo");

        const post = await Post.create(data);

        const populatedPost = await post.populate([
            { path: 'user' }
        ]);
        return new PostResponseDTO(populatedPost);
    }

    async deletePost(id: string): Promise<void> {
        if (!id) throw new Error("ID do post é obrigatório");

        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) throw new Error("Post não encontrado");
    }
}