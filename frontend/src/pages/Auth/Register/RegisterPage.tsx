import { useForm } from "react-hook-form";
import "./RegisterPage.scss";
import type { User } from "../../../types/user";

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<User>();

  const onSubmit = (data: User) => {
    console.log("Cadastro enviado:", data);
  };

  return (
    <div className="register">
      <div className="register__box">
        <h2>Criar conta</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <input
            type="text"
            placeholder="Nome"
            {...register("nome", { required: "Nome é obrigatório" })}
          />
          {errors.nome && <span>{errors.nome.message}</span>}

          <input
            type="email"
            placeholder="Email"
            {...register("email", { 
              required: "Email é obrigatório", 
              pattern: { value: /^\S+@\S+$/i, message: "Email inválido" } 
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}

          <input
            type="password"
            placeholder="Senha"
            {...register("senha", { required: "Senha é obrigatória", minLength: { value: 6, message: "Mínimo 6 caracteres" } })}
          />
          {errors.senha && <span>{errors.senha.message}</span>}

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
