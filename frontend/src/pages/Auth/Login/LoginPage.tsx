import { useState } from "react";
import "./LoginPage.scss";
import Input from "../../../components/Input/Input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login com:", { email, senha });
    // aqui você chama sua API de autenticação
  };

  return (
    <div className="login">
      <div className="login__box">
        <h2>Entrar</h2>
        <form onSubmit={handleSubmit}>
          <Input 
            type="text" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input 
            type="password" 
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
        <p className="login__register">
          Não tem conta? <a href="/register">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}
