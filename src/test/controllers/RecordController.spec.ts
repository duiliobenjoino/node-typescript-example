import { DataSource } from 'typeorm';
import { AppDataSource } from '../../infra/typeorm/datasource';
import { expect, it, beforeAll, afterAll } from '@jest/globals';
import { describe } from 'node:test';
import Status from '../../app/dtos/Status';
import Type from '../../app/dtos/Type';
import { app } from '../../app';
import request from "supertest";
import { CategoryRepositoryTO } from '../../infra/typeorm/repositories/CategoryRepositoryTO';
import UserRepositoryTO from '../../infra/typeorm/repositories/UserRepositoryTO';

describe("Testing Record Controller", async () => {
    var userId: number;
    var categoryId: number;

    var connection: DataSource;

    beforeAll(async () => {
        connection = await AppDataSource.initialize();

        const repUser = new UserRepositoryTO();
        const user = await repUser.save({
            name: 'User', 
            login:  '1234567',
            password: "1234",
            status: Status.ACTIVE,
            type: Type.USER
        });
        userId = user.id || 0;

        const repCategory = new CategoryRepositoryTO();
        const category = await repCategory.save({name: 'Category'}, userId);
        categoryId = category.id || 0;
    });

    afterAll(async () => {
        connection.close();
    });
  
    it("Should be able to create and update records", async () => {
        var response = await request(app)
            .post(`/${userId}/records`)
            .send({
                "description": "Lunch",
                "amount": "60.00",
                "categoryId": categoryId,
                "dueDate": "2024-02-13",
                "paid": true
            })
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");

        const user = response.body;
        user.amount = 70.99
        user.categoryId =  categoryId;

        response = await request(app)
            .post(`/${userId}/records`)
            .send(user);
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({id: user.id}));
        expect(response.body).toEqual(expect.objectContaining({amount: user.amount}));

    });

    it("Should be able to not accept incorrect records", async () => {
        var response = await request(app)
            .post(`/${userId}/records`)
            .send({
                "description": "",
                "amount": "a",
                "dueDate": "15-jan",
                "paid": "ok"
            })
        
        expect(response.status).toBe(400);

        expect(response.body.errors)
            .toEqual(expect.arrayContaining([expect.objectContaining({msg: 'description is required and must be 1 to 100 characters long'})]));
        expect(response.body.errors)
            .toEqual(expect.arrayContaining([expect.objectContaining({msg: 'amout is required and must be a number'})]));
        expect(response.body.errors)
            .toEqual(expect.arrayContaining([expect.objectContaining({msg: 'categoryId is required and must be a number'})]));
        expect(response.body.errors)
            .toEqual(expect.arrayContaining([expect.objectContaining({msg: 'dueDate is required and must have the format YYYY-MM-DD'})]));
        expect(response.body.errors)
            .toEqual(expect.arrayContaining([expect.objectContaining({msg: 'paid is required and must be a boolean'})]));

    });
});