import { NewUserDTO } from "./dtos/NewUserDTO";
import { UserResponseDTO } from "./dtos/UserResponseDTO";
import { User } from "./User.model";
import bcrypt from "bcryptjs";

export class UserService {

    async getAll(): Promise<UserResponseDTO[]> {
        const users = await User.find();
        return users.map(user => new UserResponseDTO(user));
    }

    async createUser(data: NewUserDTO): Promise<UserResponseDTO> {
        if (data == null) throw new Error("O usuário não pode ser nulo");

        const hashedPassword = await bcrypt.hash(data.senha, 10);

        const user = await User.create({
            ...data,
            senha: hashedPassword,
        });

        return new UserResponseDTO(user);
    }

    async deleteUser(id: string): Promise<void> {
        if (!id) throw new Error("ID do usuário é obrigatório");

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) throw new Error("Usuário não encontrado");
    }

}   