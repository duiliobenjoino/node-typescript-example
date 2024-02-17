import { Category } from '../entities/Category';
export interface CategoryRepository {
    save(Category: Category, userId: number): Promise<Category>
    findBy(userId: number, id: number): Promise<Category | null>
    delete(entity: Category): Promise<any>
    find(userId: number, name?: string): Promise<Category[]>
}