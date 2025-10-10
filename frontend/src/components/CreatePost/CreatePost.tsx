import { useState } from 'react';
import './CreatePost.scss';
import { postApi } from '../../api/posts/postApi';

export type PostPayload = { text: string };

export default function CreatePost({ onPost, placeholder = 'No que você está pensando?' }: { onPost?: (p: PostPayload) => void; placeholder?: string }) {
  const [content, setContent] = useState('');

  const submit = async() => {
    try {
      await postApi.create({ content });
      setContent("");
    } catch (error) {
      
    }
  };

  return (
    <div className="pc-simple">
      <textarea
        className="pc-simple-textarea"
        placeholder={placeholder}
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <div className="pc-simple-actions">
        <button className="pc-simple-btn" onClick={submit} disabled={!content.trim()}>
          Criar postagem
        </button>
      </div>
    </div>
  );
}