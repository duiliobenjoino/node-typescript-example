import { M3CreateUniqueConstraints } from './migrations/M_3_create_unique_constraints';
import { M2AdjustTableRecords } from './migrations/M_2_adjust_table_record';
import { M1Setup } from './migrations/M_1_Setup';
import "reflect-metadata"
import { DataSource } from "typeorm"
import { CategoryEntity } from './entities/CategoryEntity';
import UserEntity from './entities/UserEntity';
import RecordEntity from './entities/RecordEntity';

const databaseName = process.env.DATABASE_NAME || "crud_example"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5437,
    username: "admin",
    password: "root",
    database: databaseName,
    schema: "public",
    dropSchema: process.env.DROP_SCHEMA == "true",
    synchronize: true,
    logging: false,
    entities: [UserEntity, CategoryEntity, RecordEntity],
    migrations: [M1Setup, M2AdjustTableRecords, M3CreateUniqueConstraints],
    subscribers: []
})