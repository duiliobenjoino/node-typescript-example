import { DataSource } from 'typeorm';
import { AppDataSource } from './../../infra/typeorm/datasource';
import { User } from './../../app/interfaces/entities/User';
import { expect, it, beforeAll, afterAll } from '@jest/globals';
import { describe } from 'node:test';
import UserDTO from '../../app/dtos/UserDTO';
import Status from '../../app/dtos/Status';
import Type from '../../app/dtos/Type';
import { app } from '../../app';
import request from "supertest";

describe("Testing User Controller", async () => {
    var connection: DataSource;
    
    beforeAll(async () => {
        connection = await AppDataSource.initialize();
    });

    afterAll(async () => {
        connection.close();
    });
  
    it("Should be able to create a new user", async () => {
        const dto = createUserDTO('teste2','teste123456');
        const response = await request(app)
            .post("/users")
            .send(dto);
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });


    it("Should find user with successfully", async () => {
        const response2 = await request(app).get("/users").send();
        expect(response2.status).toBe(200);
    });

    it("Should not accept users with improper data", async () => {
        var response = await request(app).post("/users").send({name: ''});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors)
            .toEqual(expect.arrayContaining([expect.objectContaining({msg: 'Name is required'})]));

        response = await request(app).post("/users").send({login: '123'});
        expect(response.body.errors)
            .toEqual(expect.arrayContaining([expect.objectContaining({msg: 'Login must be 6 to 20 characters long'})]));
        
        response = await request(app).post("/users").send({type: 'A', status: 'B'});
        expect(response.body.errors)
            .toEqual(expect.arrayContaining([expect.objectContaining({msg: "Allowed types: [ADMIN,USER]"})]));
        expect(response.body.errors)
            .toEqual(expect.arrayContaining([expect.objectContaining({msg: "Allowed status: [ACTIVE,INACTIVE,PENDING]"})]));
            
    });
});


function createUserDTO(name: string, login:string, id?:number): UserDTO {
    const user: User = {
        id: id, 
        name: name, 
        login: login,
        password: "1234",
        status: Status.ACTIVE,
        type: Type.USER
    }
    return UserDTO.create(user);
}