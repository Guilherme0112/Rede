import { useState } from "react";
import "./ProfilePage.scss";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { formatDateTime } from "../../utils/helpers";

export default function ProfilePage() {

  const user = useSelector((state: RootState) => state.auth.user);
  const [activeTab, setActiveTab] = useState<"posts">("posts");

  return (
    <div className="user-profile">
      <div className="user-profile__header">

        <div className="user-profile__name">
          <h2>{user?.nome}</h2>
          <p><strong>Id:</strong> @{user?._id}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Membro desde:</strong> {formatDateTime(user?.createdAt)}</p>
        </div>
      </div>

      <div className="user-profile__tabs">
        <button
          className={activeTab === "posts" ? "active" : ""}
          onClick={() => setActiveTab("posts")}
        >
          Postagens
        </button>
      </div>

      <div className="user-profile__content">
  
        {activeTab === "posts" && (
          <div className="user-profile__posts">
            {/* <Post posts={posts} /> */}
          </div>
        )}
      </div>
    </div>
  );
}
