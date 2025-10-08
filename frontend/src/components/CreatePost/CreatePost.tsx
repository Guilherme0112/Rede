import { useState } from 'react';
import './CreatePost.scss';

export type PostPayload = { text: string };

export default function CreatePost({ onPost, placeholder = 'No que você está pensando?' }: { onPost?: (p: PostPayload) => void; placeholder?: string }) {
  const [text, setText] = useState('');

  function submit() {
    console.log(text)
  }

  return (
    <div className="pc-simple">
      <textarea
        className="pc-simple-textarea"
        placeholder={placeholder}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <div className="pc-simple-actions">
        <button className="pc-simple-btn" onClick={submit} disabled={!text.trim()}>
          Criar postagem
        </button>
      </div>
    </div>
  );
}