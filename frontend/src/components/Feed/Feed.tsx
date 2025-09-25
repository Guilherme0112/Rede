import Post from "../Post/Post";
import "./Feed.scss";

export default function Feed() {
  return (
    <main className="feed">
      <h2>Home</h2>
      <Post user="Guilherme" content="Esse é meu primeiro tweet no MVP 🚀" />
      <Post user="João" content="React + SCSS é massa demais 😎" />
    </main>
  );
}
