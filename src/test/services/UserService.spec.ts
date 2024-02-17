import { CustomError } from './../../app/errors/CustomError';
import { User } from './../../app/interfaces/entities/User';
import { UserRepository } from './../../app/interfaces/repositories/UserRepository';
import { describe } from 'node:test';
import { expect, it, beforeAll } from '@jest/globals';
import UserRepositoryInMemory from '../../infra/mockDatabase/UserRepositoryInMemory';
import UserService from '../../app/services/UserService';
import Status from '../../app/dtos/Status';
import UserDTO from '../../app/dtos/UserDTO';
import Type from '../../app/dtos/Type';
import UserFilter from '../../app/dtos/filters/UserFilter';

describe("Creating User", async () => {
    let repository: UserRepository;
    let service: UserService;

    beforeAll(() => {
        repository = new UserRepositoryInMemory();
        service = new UserService(repository);
    });

    it("Should to create a new user", async () => {

        const user:UserDTO = createUserDTO("Teste", "teste");
        const result: User = await service.save(UserDTO.create(user));

        expect(result).toHaveProperty("id");
        expect(result.status).toBe(Status.ACTIVE);
    });

    it("Should to update a user", async () => {

        const user:UserDTO = createUserDTO("Teste2", "teste2");
        const firstUser: User = await service.save(UserDTO.create(user));

        user.id = firstUser.id;
        user.login = "Changed";
        const result: User = await service.save(UserDTO.create(user));

        expect(firstUser.id).toBe(result.id);
        expect(result.login).toBe("Changed");

        const allUsers = await service.find(new UserFilter({name: user.name}));
        expect(allUsers.length).toBe(1);
    });


    it("Should be thrown exception when the search does not find a user ", async () => {
        const id = '10';
        await expect(service.findById(id))
              .rejects.toEqual(new CustomError(`User ${id} not found`, 404));
    });
});

function createUserDTO(name: string, login:string, id?:number): UserDTO {
    const user: User = {
        id, name, login,
        password: "1234",
        status: Status.ACTIVE,
        type: Type.USER
    }
    return UserDTO.create(user);
}