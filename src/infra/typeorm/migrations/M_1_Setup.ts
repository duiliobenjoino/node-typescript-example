import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class M1Setup implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {name: 'id', type: 'int', isPrimary: true, generationStrategy: 'increment'},
                    {name: 'name', type: 'varchar', length: '100', isNullable: false},
                    {name: 'login', type: 'varchar', length: '20', isNullable: false},
                    {name: 'password', type: 'varchar', length: '50', isNullable: false},
                    {name: 'type', type: 'varchar', length: '10', isNullable: false},
                    {name: 'status', type: 'varchar', length: '10', isNullable: false}
                ]
            })
        )
        await queryRunner.createTable(
            new Table({
                name: 'category',
                columns: [
                    {name: 'id', type: 'int', isPrimary: true, generationStrategy: 'increment'},
                    {name: 'name', type: 'varchar', length: '100', isNullable: false},
                    {name: 'user_id', type: 'int'}
                ]
            })
        )
        await queryRunner.createForeignKey(
            "category",
            new TableForeignKey({columnNames: ["user_id"], referencedColumnNames: ["id"], referencedTableName: "user", onDelete: "RESTRICT"}),
        )
        await queryRunner.createTable(
            new Table({
                name: 'record',
                columns: [
                    {name: 'id', type: 'int', isPrimary: true, generationStrategy: 'increment'},
                    {name: 'description', type: 'varchar', length: '200', isNullable: false},
                    {name: 'amount', type: 'decimal', isNullable: false},
                    {name: 'category_id', type: 'int'},
                    {name: 'user_id', type: 'int'}
                ]
            })
        )
        await queryRunner.createForeignKey(
            "record",
            new TableForeignKey({columnNames: ["user_id"], referencedColumnNames: ["id"], referencedTableName: "user", onDelete: "RESTRICT"}),
        )
        await queryRunner.createForeignKey(
            "record",
            new TableForeignKey({columnNames: ["category_id"], referencedColumnNames: ["id"], referencedTableName: "category", onDelete: "RESTRICT"}),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user')
        await queryRunner.dropTable('category')
        await queryRunner.dropTable('record')
    }

}
