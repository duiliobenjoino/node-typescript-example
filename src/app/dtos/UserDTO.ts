import { User } from './../interfaces/entities/User';
import Type from "./Type";
import Status from "./Status";

class UserDTO {
    id?: number
    name?: string
    login?: string
    password?: string
    type?: Type
    status?: Status

    private constructor(){}

    static create(json:any) {
        const dto = new UserDTO();
        dto.id = json.id
        dto.name = json.name
        dto.login = json.login
        dto.password = json.password
        dto.type = Type.valueOf(json.type)
        dto.status = Status.valueOf(json.status)
        return dto;
    }

    static fromEntity(user: User) {
        const dto = new UserDTO();
        dto.id = user.id
        dto.name = user.name
        dto.login = user.login
        dto.type = Type.valueOf(user.type)
        dto.status = Status.valueOf(user.status)
        return dto;
    }

    toEntity(): User {
        return {
            id: this.id,
            name: this.name,
            login: this.login, 
            password: this.password,
            type: this.type,
            status: this.status
        }
    }
}

export default UserDTO;