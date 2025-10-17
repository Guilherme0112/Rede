import { useState } from 'react';
import { Heart, MessageCircle, MoreHorizontal, User, Trash2, Edit } from 'lucide-react';
import "./PostBox.scss";
import { formatDateTime } from '../../utils/helpers';
import { useDeletePost } from '../../hooks/usePosts';
import toast from 'react-hot-toast';
import EditarPost from '../EditarPost/EditarPost';
import type { Post } from '../../types/post';
import { useComments, useCreateComment, useDeleteComment } from '../../hooks/useComments';
import type { CommentCreate } from '../../types/dtos/CommentCreate';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { Link } from 'react-router-dom';
import EditarComment from '../EditarComment/EditarComment';
import type { Comment } from '../../types/Comment';

type PostBoxProps = {
  post: Post;
}

const PostBox = ({ post }: PostBoxProps) => {
  const [showComments, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showEdit, setShowEdit] = useState<'comment' | 'post' | null>(null);
  const { mutate: createComment } = useCreateComment();
  const { mutate: deletePost, isPending } = useDeletePost();
  const [newComment, setNewComment] = useState<CommentCreate>({ post: '', content: '', });
  const [openCommentMenuId, setOpenCommentMenuId] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const { mutate: deleteComment } = useDeleteComment(post.id);
  const { data: comments = [] } = useComments(post.id);


  const handleLike = (postId: string, commentId: string | null = null) => console.log("like", postId, commentId);
  const toggleComments = () => setShowComments(prev => !prev);
  const handleAddComment = (post: string, content: string) => {
    const commentData = {
      post,
      content,
    };
    createComment(commentData);
    setNewComment({ post: '', content: '' });
    toast.success('Comentário criado com sucesso!')
  };


  const handleDeleteComment = (commentId: string) => {
    deleteComment(commentId, {
      onSuccess: () => {
        toast.success('Comentário deletado com sucesso!');
      },
      onError: () => {
        toast.error('Erro ao deletar comentário. Tente novamente.');
      },
    });
  };



  const handleEditComment = (comment: Comment) => {
    setEditingComment(comment);
    setShowEdit('comment')
  }

  const handleEdit = (postId: string) => { setShowEdit('post'); setShowMenu(false); };
  const handleDelete = (postId: string) => {
    deletePost(postId, {
      onSuccess: () => {
        toast.success('Post deletado com sucesso!');
        setShowMenu(false);
      },
      onError: (err) => {
        toast.error('Ocorreu algum erro ao deletar a postagem. Tente novamente mais tarde')
      }
    });; setShowMenu(false);
  };
  const formatNumber = (num: number) => (num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num.toString());

  return (
    <>
      <div className="post">
        <div className="post-header">
          <div className="avatar"><User size={24} color="var(--text-muted)" /></div>
          <div className="post-content">
            <div className="user-info-container">
              <div className="user-info">
                <span className="user-name">{post.user.nome}</span>
                <div><span className='username'>@</span><span className="username">{post.user._id}</span></div>
                <span className="separator">·</span>
                <span className="timestamp">{formatDateTime(post.timestamp)}</span>
              </div>

              {/* Botão 3 pontinhos */}
              <div className="more-container">
                <button className="more-button" onClick={() => setShowMenu(prev => !prev)}>
                  <MoreHorizontal size={20} />
                </button>
                {showMenu && (
                  <div className="dropdown-menu">
                    <button onClick={() => handleEdit(post.id)}><Edit size={14} /> Editar</button>
                    <button onClick={() => handleDelete(post.id)}><Trash2 size={14} /> Excluir</button>
                  </div>
                )}
              </div>
            </div>

            <div className="post-text">{post.content}</div>
            {user ? (
              <div className="actions">
                <button className={`action-button like ${post.likes ? 'active' : ''}`} onClick={() => handleLike(post.id)}>
                  <div className="action-icon"><Heart size={18} fill={post.likes ? 'currentColor' : 'none'} /></div>
                  <span>{formatNumber(post.likes)}</span>
                </button>
                <button className="action-button comment" onClick={toggleComments}>
                  <div className="action-icon"><MessageCircle size={18} /></div>
                  <span>{formatNumber(post.comments.length)}</span>
                </button>
              </div>
            ) : (
              <h4 className="login-warning">
                Você precisa estar logado para curtir, comentar e interagir com as postagens.<br />
                <Link className="login-link" to="/login">Entre ou crie sua conta agora.</Link >
              </h4>

            )}

          </div>
        </div>

        {showComments && (
          <div className="comments-section">
            {/* Adicionar novo comentário */}
            <div className="add-comment">
              <div className="comment-form">
                <div className="comment-avatar"><User size={20} color="var(--text-muted)" /></div>
                <div className="comment-input-container">
                  <textarea
                    className="comment-textarea"
                    value={newComment.post === post.id ? newComment.content : ''}
                    onChange={(e) =>
                      setNewComment({ post: post.id, content: e.target.value })
                    }
                    placeholder="Adicionar um comentário..."
                    rows={3}
                  />
                  <div className="comment-actions">
                    <button
                      className="comment-submit"
                      onClick={() => handleAddComment(post.id, newComment.content)}
                      disabled={!newComment.content.trim()}
                    >
                      Comentar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comentários existentes */}
            {comments.map(comment => (
              <div key={comment.id} className="comment">
                <div className="comment-header">
                  <div className="comment-avatar"><User size={20} color="var(--text-muted)" /></div>
                  <div className="comment-content">
                    <div className="comment-user-info">
                      <div className="comment-user-info-1">
                        <span className="comment-user-name">{comment.user.nome}</span>
                        <span className="username">@{comment.user._id}</span>
                        <span className="separator">·</span>
                        <span className="timestamp">{formatDateTime(comment.timestamp)}</span>
                      </div>

                      {/* Dropdown para comentário */}
                      <div className="more-container">
                        <button
                          className="more-button"
                          onClick={() =>
                            setOpenCommentMenuId(prev => prev === comment.id ? null : comment.id)
                          }
                        >
                          <MoreHorizontal size={16} />
                        </button>

                        {openCommentMenuId === comment.id && (
                          <div className="dropdown-menu">
                            <button onClick={() => handleEditComment(comment)}>
                              <Edit size={14} /> Editar
                            </button>
                            <button onClick={() => handleDeleteComment(comment.id)}>
                              <Trash2 size={14} /> Excluir
                            </button>
                          </div>
                        )}
                        {showEdit === "comment" && (
                          <EditarComment
                            comment={editingComment!}
                            isOpen={showEdit === 'comment'}
                            onClose={() => setShowEdit(null)}
                            postId={post.id}
                          />
                        )}

                      </div>
                    </div>

                    <div className="comment-text">{comment.content}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showEdit === 'post' && (
        <EditarPost
          post={post}
          isOpen={showEdit === 'post'}
          onClose={() => setShowEdit(null)}
        />
      )}
    </>
  );
}

export default PostBox;
