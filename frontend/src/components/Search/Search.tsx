import { Search as SearchIcon } from "lucide-react";
import "./Search.scss";

export default function Search() {
  return (
    <div className="search-bar">
      <div className="search-bar__input-wrapper">
        <SearchIcon size={18} />
        <input type="text" placeholder="Pesquisar no Twitter" />
      </div>
    </div>
  );
}
