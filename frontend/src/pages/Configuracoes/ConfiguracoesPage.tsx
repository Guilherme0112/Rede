import { useForm } from "react-hook-form";
import "./Configuracoes.scss";
import { userApi } from "../../api/users/userApi";
import type { User } from "../../types/User";
import Input from "../../components/Input/Input";
import type { UserUpdate } from "../../types/dtos/UserUpdate";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMe } from "../../store/slices/authSlice";

export default function ConfiguracoesPage() {

  const user = useSelector((state: RootState) => state.auth.user);
  const navigate  = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, watch, setValue, formState: { errors, isDirty } } = useForm<UserUpdate>();

  useEffect(() => {
    if (user) {
      setValue("_id", user._id);
      setValue("nome", user.nome);
      setValue("email", user.email);
    }
  }, [user, setValue]);

  const repeteSenha = watch("repeteSenha");

  const onSubmit = async (data: User) => {
    try {
      if (data.senha && data.senha !== repeteSenha) {
        alert("As senhas não coincidem");
        return;
      }
      await userApi.update(data);

      dispatch(fetchMe());


      navigate(`/profile/${user?._id}`)
      toast.success("Perfil atualizado com sucesso")
    } catch (error) {
      toast.error("Ocorreu algum erro ao atualizar o perfil. Tente novamente mais tarde")
    }
  };


  return (
    <div className="register">
      <div className="register__box">
        <h2>Atualizar dados</h2>
        <form onSubmit={handleSubmit(onSubmit)}>

          <Input
            type="hidden"
            error={errors?._id?.message || null}
            {...register("_id")}
          />

          <Input
            type="text"
            placeholder="Nome"
            {...register("nome", { required: "Nome é obrigatório" })}
            error={errors?.nome?.message || null}
          />

          <Input
            type="email"
            placeholder="Email"
            {...register("email")}
            disabled
          />

          <Input
            type="password"
            placeholder="Nova senha"
            {...register("senha", { minLength: { value: 6, message: "Mínimo 6 caracteres" } })}
            error={errors?.senha?.message || null}
          />

          <Input
            type="password"
            placeholder="Repita a nova senha"
            {...register("repeteSenha")}
          />

          <button
            type="submit"
            disabled={!isDirty}
            style={{
              opacity: !isDirty ? 0.6 : 1,
              cursor: !isDirty ? "not-allowed" : "pointer",
            }}
          >
            Atualizar
          </button>
        </form>
      </div>
    </div>
  );
}
