import { ArrowRightLeft, Heart, MessageCircle } from "lucide-react";
import "./Post.scss";

type PostProps = {
  user: string;
  time?: string;
  content: string;
};

export default function Post({ user, time = "1h", content }: PostProps) {

  const darLike = () => {
    console.log("Like dado!");
  }

  const verComentarios = () => {
    console.log("Ver comentários!");
  }

  const compartilhar = () => {
    console.log("Post compartilhado!");
  }

  return (
    <div className="post">
      <div className="post__avatar">👤</div>
      <div className="post__content">
        <div className="post__header">
          <span className="post__user">{user}</span>
          <span className="post__dot">·</span>
          <span className="post__time">{time}</span>
        </div>
        <p className="post__text">{content}</p>
        <div className="post__actions">
          <button onClick={darLike} ><Heart /></button>
          <button onClick={verComentarios}><MessageCircle /></button>
          <button onClick={compartilhar}><ArrowRightLeft /></button>
        </div>
      </div>
    </div>
  );
}
