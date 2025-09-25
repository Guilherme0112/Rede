import "./Search.scss";

export default function Search() {
  return (
    <aside className="search">
      <input type="text" placeholder="Pesquisar no Twitter" />
      <div className="search__trends">
        <h3>Tendências</h3>
        <ul>
          <li>#React</li>
          <li>#SCSS</li>
          <li>#MVP</li>
        </ul>
      </div>
    </aside>
  );
}
