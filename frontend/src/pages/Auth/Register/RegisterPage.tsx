import { useForm } from "react-hook-form";
import "./RegisterPage.scss";
import Input from "../../../components/Input/Input";
import type { User } from "../../../types/User";
import { Link } from "react-router-dom";
import { userApi } from "../../../api/users/userApi";

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<User>();

  const onSubmit = async(data: User) => {
    try {
      const res = await userApi.create(data);
    } catch (error) {
      
    }
  };

  return (
    <div className="register">
      <div className="register__box">
        <h2>Criar conta</h2>
        <form onSubmit={handleSubmit(onSubmit)}>

          <Input
            type="text"
            placeholder="Nome"
            {...register("nome", { required: "Nome é obrigatório" })}
            error={errors?.nome?.message || null}
          />

          <Input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email é obrigatório",
              pattern: { value: /^\S+@\S+$/i, message: "Email inválido" }
            })}
            error={errors?.email?.message || null}
          />

          <Input
            type="password"
            placeholder="Senha"
            {...register("senha", { required: "Senha é obrigatória", minLength: { value: 6, message: "Mínimo 6 caracteres" } })}
            error={errors?.senha?.message || null}
          />


          <Input
            type="password"
            placeholder="Repita a senha"
          />

          <button type="submit">Cadastrar</button>
        </form>
        <p className="login__register">
          Já tem conta? <Link to="/login">Faça login</Link>
        </p>
      </div>
    </div>
  );
}
