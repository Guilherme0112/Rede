import { useState } from 'react';
import { Heart, MessageCircle, MoreHorizontal, User, Trash2, Edit } from 'lucide-react';
import "./PostBox.scss";
import type { Post as PostType } from '../../types/post';
import { formatDateTime } from '../../utils/helpers';
import { useDeletePost } from '../../hooks/usePosts';
import toast from 'react-hot-toast';
import EditarPost from '../EditarPost/EditarPost';

type PostBoxProps = {
  post: PostType
}

const PostBox = ({ post }: PostBoxProps) => {
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
  const [showComments, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const { mutate: deletePost, isPending } = useDeletePost();

  const handleLike = (postId: string, commentId: string | null = null) => console.log("like", postId, commentId);
  const toggleComments = () => setShowComments(prev => !prev);
  const handleAddComment = () => console.log("comentário");
  const handleEdit = (postId: string) => { setShowEdit(true); setShowMenu(false); };
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
                    value={newComment[post.id] || ''}
                    onChange={(e) => setNewComment({ [post.id]: e.target.value })}
                    placeholder="Adicionar um comentário..."
                    rows={3}
                  />
                  <div className="comment-actions">
                    <button className="comment-submit" onClick={handleAddComment} disabled={!newComment[post.id]?.trim()}>Comentar</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comentários existentes */}
            {post.comments.map(comment => (
              <div key={comment.id} className="comment">
                <div className="comment-header">
                  <div className="comment-avatar"><User size={20} color="var(--text-muted)" /></div>
                  <div className="comment-content">
                    <div className="comment-user-info">
                      <span className="comment-user-name">{comment.user.nome}</span>
                      <span className="comment-username">@{comment.user._id}</span>
                      <span className="separator">·</span>
                      <span className="comment-timestamp">{comment.timestamp}</span>
                      {/* Dropdown para comentário */}
                      <div className="more-container">
                        <button className="more-button"> <MoreHorizontal size={16} /> </button>
                        {/* Aqui você pode adicionar menu de editar/deletar comentário */}
                      </div>
                    </div>
                    <div className="comment-text">{comment.content}</div>

                    {/* Likes de comentário */}
                    <div className="comment-actions">
                      <button className={`comment-like ${comment.liked ? 'active' : ''}`} onClick={() => handleLike(post.id, comment.id)}>
                        <div className="comment-like-icon">
                          <Heart size={16} fill={comment.liked ? 'currentColor' : 'none'} />
                        </div>
                        <span>{formatNumber(comment.likes)}</span>
                      </button>
                    </div>

                    {/* Subcomentários, se houver */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="comments-section">
                        {comment.replies.map(reply => (
                          <div key={reply.id} className="comment">
                            <div className="comment-header">
                              <div className="comment-avatar"><User size={20} color="var(--text-muted)" /></div>
                              <div className="comment-content">
                                <div className="comment-user-info">
                                  <span className="comment-user-name">{reply.user.nome}</span>
                                  <span className="comment-username">@{reply.user._id}</span>
                                  <span className="separator">·</span>
                                  <span className="comment-timestamp">{reply.timestamp}</span>
                                </div>
                                <div className="comment-text">{reply.content}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>


      {showEdit && (
        <EditarPost
          post={post}
          isOpen={showEdit}
          onClose={() => setShowEdit(false)}
        />
      )}
    </>
  );
}

export default PostBox;
