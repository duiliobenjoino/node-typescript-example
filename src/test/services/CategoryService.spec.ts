import { CustomError } from './../../app/errors/CustomError';
import { Category } from '../../app/interfaces/entities/Category';
import { CategoryRepository } from '../../app/interfaces/repositories/CategoryRepository';
import { describe } from 'node:test';
import { expect, it, beforeAll, afterAll } from '@jest/globals';
import CategoryService from '../../app/services/CategoryService';
import CategoryRepositoryInMemory from '../../infra/mockDatabase/CategoryRepositoryInMemory';

describe("Validating Category CRUD", async () => {
    let repository: CategoryRepository;
    let service: CategoryService;

    beforeAll(async () => {
        repository = new CategoryRepositoryInMemory();
        service = new CategoryService(repository);
        
    });

    it("Must successfully insert, update and remove a category", async () => {
        const userId: string = '1';
        const categoryName = 'Teste'
        const category: Category = { name: categoryName};
        const result: Category = await service.save(category, userId);

        expect(result).toHaveProperty("id");
        expect(result.name).toBe(categoryName);

        const resultUpdated: Category = await service.save(category, userId);
        category.name = 'Changed'

        expect(resultUpdated.id).toBe(result.id);
        expect(result.name).toBe("Changed");

        const categoryInDB = await service.find(userId);
        expect(categoryInDB.length).toBe(1);

        await service.delete(userId, '1');

        await expect(service.findBy(userId, '1'))
              .rejects.toEqual(new CustomError(`Category 1 not found`, 404));

    });

});