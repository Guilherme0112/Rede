import { Home, User, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import "./Sidebar.scss";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link to="/">
            <Home size={20} color="white" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <User size={20} color="white" />
            <span>Meu Perfil</span>
          </Link>
        </li>
        <li>
          <Link to="/login">
            <LogIn size={20} color="white" />
            <span>Entrar</span>
          </Link>
        </li>
        <li>
          <Link to="/register">
            <UserPlus size={20} color="white" />
            <span>Criar Conta</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
