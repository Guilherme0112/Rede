import { useEffect, useState } from "react";
import "./Feed.scss";
import { postApi } from "../../api/posts/postApi";
import type { Post } from "../../types/post";
import PostBox from "../PostBox/PostBox";
import CreatePost from "../CreatePost/CreatePost";

export default function Feed() {
  
  const [posts, setPosts] = useState<Post | []>([]);

    useEffect(() => {
    postApi.getAll().then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <main className="feed">
      <div className="feed-create-post">
        <CreatePost />
      </div>
      {posts.map((post) => (
        <PostBox key={post.id} post={post} />
      ))}
    </main>
  );
}
