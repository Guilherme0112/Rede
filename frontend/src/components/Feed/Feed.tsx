import { useState } from "react";
import Post from "../Post/Post";
import "./Feed.scss";

export default function Feed() {

  const [posts, setPosts] = useState([
      {
        id: 1,
        user: {
          name: 'João Silva',
          username: '@joaosilva',
          avatar: null
        },
        content: 'Acabei de criar um novo projeto em React! Muito animado para compartilhar com vocês. O que acham?',
        timestamp: '2h',
        likes: 15,
        retweets: 3,
        comments: [
          {
            id: 1,
            user: {
              name: 'Maria Santos',
              username: '@mariasantos',
              avatar: null
            },
            content: 'Parabéns! Adoraria ver mais detalhes do projeto.',
            timestamp: '1h',
            likes: 5,
            liked: false
          },
          {
            id: 2,
            user: {
              name: 'Pedro Costa',
              username: '@pedrocosta',
              avatar: null
            },
            content: 'React é incrível! Qual biblioteca de UI você usou?',
            timestamp: '30min',
            likes: 2,
            liked: false
          }
        ],
        liked: false,
        retweeted: false
      },
      {
        id: 2,
        user: {
          name: 'Ana Oliveira',
          username: '@anaoliveira',
          avatar: null
        },
        content: 'Bom dia pessoal! Alguém tem dicas de boas práticas para CSS Grid? Estou estudando e gostaria de algumas dicas avançadas.',
        timestamp: '4h',
        likes: 28,
        retweets: 8,
        comments: [
          {
            id: 3,
            user: {
              name: 'Carlos Lima',
              username: '@carloslima',
              avatar: null
            },
            content: 'Recomendo estudar o auto-fit e auto-fill, fazem toda diferença!',
            timestamp: '3h',
            likes: 12,
            liked: false
          }
        ],
        liked: true,
        retweeted: false
      }
    ]);

  return (
    <main className="feed">
      <Post posts={posts} />
    </main>
  );
}
