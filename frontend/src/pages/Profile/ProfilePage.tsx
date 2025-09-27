// UserProfilePage.tsx
import { useState } from "react";
import "./ProfilePage.scss";
import Post from "../../components/Post/Post";

export default function ProfilePage() {

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

  const [activeTab, setActiveTab] = useState<"info" | "posts">("info");

  return (
    <div className="user-profile">
      <div className="user-profile__header">

        <div className="user-profile__name">
          <h2>Guilherme Mendes</h2>
          <p>@guimends</p>
        </div>
      </div>

      <div className="user-profile__tabs">
        <button
          className={activeTab === "info" ? "active" : ""}
          onClick={() => setActiveTab("info")}
        >
          Informações
        </button>
        <button
          className={activeTab === "posts" ? "active" : ""}
          onClick={() => setActiveTab("posts")}
        >
          Postagens
        </button>
      </div>

      <div className="user-profile__content">
        {activeTab === "info" && (
          <div className="user-profile__info">
            <p><strong>Email:</strong> guilherme@email.com</p>
            <p><strong>Sexo:</strong> Masculino</p>
            <p><strong>Membro desde:</strong> 01/2023</p>
            <p><strong>Total de postagens:</strong> {posts.length}</p>
          </div>
        )}

        {activeTab === "posts" && (
          <div className="user-profile__posts">
            <Post posts={posts} />
          </div>
        )}
      </div>
    </div>
  );
}
