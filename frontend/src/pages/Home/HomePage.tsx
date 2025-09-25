import Sidebar from "../../components/Sidebar/Sidebar";
import Search from "../../components/Search/Search";
import "./Home.scss";
import Feed from "../../components/Feed/Feed";

export default function HomePage() {
  return (
    <div className="home">
      <Feed />
      <Search />
    </div>
  );
}
