import { useEffect, useState } from "react";
import "./Feed.scss";
import { postApi } from "../../api/posts/postApi";
import type { Post } from "../../types/post";
import PostBox from "../PostBox/PostBox";
import CreatePost from "../CreatePost/CreatePost";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export default function Feed() {

  const [posts, setPosts] = useState<Post[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    postApi.getAll().then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <main className="feed">
      {user && (
        <div className="feed-create-post">
          <CreatePost />
        </div>
      )}

      {posts.map((post) => (
        <PostBox key={post.id} post={post} />
      ))}
    </main>
  );
}
