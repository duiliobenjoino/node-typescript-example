import { User } from './../entities/User';
import UserFilter from '../../dtos/filters/UserFilter';
export interface UserRepository {
    save(user: User): Promise<User>
    findById(id: number): Promise<User | null>
    deleteById(id: number): Promise<any>
    find(filter: UserFilter): Promise<User[]>
}