import { Tablet } from "lucide-react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>
        <Tablet size={70} />
      </h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Entrar</Link>
          </li>
          <li>
            <Link to="/login">Meu Perfil</Link>
          </li>
          <li>
            <Link to="/register">Criar Conta</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
