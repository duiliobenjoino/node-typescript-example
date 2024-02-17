import { CustomError } from './../errors/CustomError';
import { Category } from '../interfaces/entities/Category';
import { CategoryRepository } from '../interfaces/repositories/CategoryRepository';
class CategoryService {
    repository: CategoryRepository;

    constructor(repository: CategoryRepository){
        this.repository = repository;
    }

    async find(userId: string, name?: string) {
        return await this.repository.find(parseInt(userId), name);
    }

    async findBy(userId: string, id: string) {
        const result = await this.repository.findBy(parseInt(userId), parseInt(id));
        if(!result){
            throw new CustomError(`Category ${id} not found`, 404);
        }
        return result;
    }

    async save(category: Category, userId: string): Promise<Category> {
        const result = await this.repository.save(category, parseInt(userId));
        return result;
    }

    async delete(userId: string, id: string) {
        const entity = await this.repository.findBy(parseInt(userId), parseInt(id));
        if(!entity) throw new CustomError(`Category ${id} not found`, 404)

        await this.repository.delete(entity);
    }
    
}

export default CategoryService