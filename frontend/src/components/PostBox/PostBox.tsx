import { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, User } from 'lucide-react';
import "./PostBox.scss";
import type { Post as PostType } from '../../types/post';
import { formatDateTime } from '../../utils/helpers';

type PostBoxProps = {
  post: PostType
}

const PostBox = ({ post }: PostBoxProps) => {
  const [newComment, setNewComment] = useState({});
  const [showComments, setShowComments] = useState(false);

  const handleLike = (postId: string, commentId: string | null = null) => {
    console.log("like");
  };

  const handleRetweet = (postId: string) => {
    console.log('retweet');
  };

  const toggleComments = () => {
    setShowComments(prev => !prev);
  };

  const handleAddComment = () => {
    console.log("comentário");
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="avatar">
          <User size={24} color="var(--text-muted)" />
        </div>

        <div className="post-content">
          <div className="user-info">
            <span className="user-name">{post.user.nome}</span>
            <div>
              <span className='username'>@</span><span className="username">{post.user._id}</span>
            </div>
            <span className="separator">·</span>
            <span className="timestamp">{formatDateTime(post.timestamp)}</span>
            <button className="more-button">
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="post-text">{post.content}</div>

          <div className="actions">
            <button
              className={`action-button like ${post.liked ? 'active' : ''}`}
              onClick={() => handleLike(post.id)}
            >
              <div className="action-icon">
                <Heart size={18} fill={post.liked ? 'currentColor' : 'none'} />
              </div>
              <span>{formatNumber(post.likes)}</span>
            </button>
            <button
              className="action-button comment"
              onClick={toggleComments}
            >
              <div className="action-icon">
                <MessageCircle size={18} />
              </div>
              <span>{formatNumber(post.comments.length)}</span>
            </button>
            <span></span>
          </div>
        </div>
      </div>

      {showComments && (
        <div className="comments-section">
          <div className="add-comment">
            <div className="comment-form">
              <div className="comment-avatar">
                <User size={20} color="var(--text-muted)" />
              </div>
              <div className="comment-input-container">
                <textarea
                  className="comment-textarea"
                  value={newComment[post.id] || ''}
                  onChange={(e) => setNewComment({ [post.id]: e.target.value })}
                  placeholder="Adicionar um comentário..."
                  rows={3}
                />
                <div className="comment-actions">
                  <button
                    className="comment-submit"
                    onClick={handleAddComment}
                    disabled={!newComment[post.id]?.trim()}
                  >
                    Comentar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {post.comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-header">
                <div className="comment-avatar">
                  <User size={20} color="var(--text-muted)" />
                </div>

                <div className="comment-content">
                  <div className="comment-user-info">
                    <span className="comment-user-name">{comment.user.nome}</span>
                    <span className="comment-username">{comment.user._id}</span>
                    <span className="separator">·</span>
                    <span className="comment-timestamp">{comment.timestamp}</span>
                  </div>

                  <div className="comment-text">{comment.content}</div>

                  <div className="comment-actions">
                    <button
                      className={`comment-like ${comment.liked ? 'active' : ''}`}
                      onClick={() => handleLike(post.id, comment.id)}
                    >
                      <div className="comment-like-icon">
                        <Heart size={16} fill={comment.liked ? 'currentColor' : 'none'} />
                      </div>
                      <span>{formatNumber(comment.likes)}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostBox;
