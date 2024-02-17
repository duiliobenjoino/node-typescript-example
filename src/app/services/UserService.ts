import { CustomError } from './../errors/CustomError';
import { UserRepository } from './../interfaces/repositories/UserRepository';
import UserFilter from '../dtos/filters/UserFilter'
import { User } from '../interfaces/entities/User';
import UserDTO from '../dtos/UserDTO';

class UserService {
    repository: UserRepository;

    constructor(repository: UserRepository){
        this.repository = repository;
    }

    async find(filter: UserFilter) {
        const result = await this.repository.find(filter);
        return result;
    }

    async findById(id: string) {
        const user = await this.repository.findById(parseInt(id));

        if(!user){
            throw new CustomError(`User ${id} not found`, 404);
        }

        return user;
    }

    async save(dto: UserDTO): Promise<User> {
        const result = await this.repository.save(dto.toEntity());
        return result;
    }

    async deleteById(id: string) {
        await this.repository.deleteById(parseInt(id));
    }
    
}

export default UserService