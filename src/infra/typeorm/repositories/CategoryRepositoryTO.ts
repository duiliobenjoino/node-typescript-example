import { CategoryRepository } from '../../../app/interfaces/repositories/CategoryRepository';
import { Category } from '../../../app/interfaces/entities/Category';
import { AppDataSource } from '../datasource';
import { CategoryEntity } from '../entities/CategoryEntity';
import { Repository, ILike } from 'typeorm';
import UserEntity from '../entities/UserEntity';

class CategoryRepositoryTO implements CategoryRepository {
    repository: Repository<CategoryEntity>

    constructor(){
        this.repository = AppDataSource.getRepository(CategoryEntity);
    }

    async save(category: CategoryEntity, userId: number): Promise<Category> {
        const user = new UserEntity()
        user.id = userId
        category.user = user;
        return this.repository.save(category);
    }

    async findBy(userId: number, id: number): Promise<Category | null> {
        return this.repository.findOneBy({id: id, user: {id: userId}})
    }

    async delete(category: Category) {
        return this.repository.delete(category)
    }

    async find(userId: number, name?: string): Promise<Category[]>{
        if(name){
            return this.repository.findBy({name: ILike(`%${name}%`), user: {id: userId}})
        }
        return this.repository.findBy({user: {id: userId}})
    }
}

export { CategoryRepositoryTO }
