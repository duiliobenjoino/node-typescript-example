import { UserRepository } from './../../../app/interfaces/repositories/UserRepository';
import { AppDataSource } from '../datasource';
import User from "../entities/UserEntity";
import UserFilter from '../../../app/dtos/filters/UserFilter'
import { SelectQueryBuilder, Repository, DeleteResult } from 'typeorm';
import UserEntity from '../entities/UserEntity';


class UserRepositoryTO implements UserRepository {
    repository: Repository<UserEntity>

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async save(user: User) {
        return this.repository.save(user);
    }

    async deleteById(id: number): Promise<DeleteResult> {
        return this.repository.delete({id: id});
    }

    async findById(id: number): Promise<User | null> {
        return this.repository.findOneById(id);
    }

    async find(filter: UserFilter): Promise<User[]>{
        var queryBuilder = this.repository.createQueryBuilder("user");
        var first = true;
        if(filter.name) {
            first = false;
            queryBuilder.where("LOWER(name) like LOWER(:name)", {name: `%${filter.name}%`});
        }
        if(filter.status != undefined) this.addStatusInQB(queryBuilder, first, filter);
        if(filter.type != undefined) this.addTypeInQB(queryBuilder, first, filter);
        
        return queryBuilder.select("*").getRawMany();
    }

    private addTypeInQB(queryBuilder: SelectQueryBuilder<User>, first: boolean, filter: UserFilter){
        const typeStr = filter.getTypeInString();
        if(first) {
            queryBuilder.where("type = :type", {type: typeStr});
            return;
        }
        first = false;
        queryBuilder.andWhere("type = :type", {type: typeStr});
    }

    private addStatusInQB(queryBuilder: SelectQueryBuilder<User>, first: boolean, filter: UserFilter){
        const statusStr = filter.getStatusInString();
        if(first) {
            queryBuilder.where("status = :status", {status: statusStr});
            return;
        }
        first = false;
        queryBuilder.andWhere("status = :status", {status: statusStr});
    }

}

export default UserRepositoryTO
