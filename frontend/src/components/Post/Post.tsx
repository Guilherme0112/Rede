import { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, User } from 'lucide-react';
import "./Post.scss";
import type { Post } from '../../types/post';

type PostProps = {
  posts: Post
}

const Post = ({ posts }: PostProps) => {
  
  const [newComment, setNewComment] = useState({});
  const [showComments, setShowComments] = useState({});

  const handleLike = (postId, commentId = null) => {
    console.log("like")
  };

  const handleRetweet = (postId) => {
    console.log('retweet')
  };

  const toggleComments = (postId) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleAddComment = (postId) => {
    console.log("comentário")
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <>
      <div className="app">
        <div className="container">
          <div className="posts">
          
            {posts.map((post) => (
              <div key={post.id} className="post">
                <div className="post-header">
                  <div className="avatar">
                    <User size={24} color="var(--text-muted)" />
                  </div>
                  
                  <div className="post-content">
                    <div className="user-info">
                      <span className="user-name">{post.user.name}</span>
                      <span className="username">{post.user.username}</span>
                      <span className="separator">·</span>
                      <span className="timestamp">{post.timestamp}</span>
                      <button className="more-button">
                        <MoreHorizontal size={20} />
                      </button>
                    </div>
                    
                    <div className="post-text">{post.content}</div>
                    
                    <div className="actions">
                      <button
                        className="action-button comment"
                        onClick={() => toggleComments(post.id)}
                      >
                        <div className="action-icon">
                          <MessageCircle size={18} />
                        </div>
                        <span>{formatNumber(post.comments.length)}</span>
                      </button>
                      
                      <button
                        className={`action-button like ${post.liked ? 'active' : ''}`}
                        onClick={() => handleLike(post.id)}
                      >
                        <div className="action-icon">
                          <Heart size={18} fill={post.liked ? 'currentColor' : 'none'} />
                        </div>
                        <span>{formatNumber(post.likes)}</span>
                      </button>
                      
                      <button className="action-button share">
                        <div className="action-icon">
                          <Share size={18} />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {showComments[post.id] && (
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
                            onChange={(e) => setNewComment(prev => ({
                              ...prev,
                              [post.id]: e.target.value
                            }))}
                            placeholder="Adicionar um comentário..."
                            rows="3"
                          />
                          <div className="comment-actions">
                            <button
                              className="comment-submit"
                              onClick={() => handleAddComment(post.id)}
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
                              <span className="comment-user-name">{comment.user.name}</span>
                              <span className="comment-username">{comment.user.username}</span>
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;