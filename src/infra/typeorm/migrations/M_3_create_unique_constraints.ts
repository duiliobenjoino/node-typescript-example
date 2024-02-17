import { MigrationInterface, QueryRunner, TableColumn, TableUnique } from "typeorm";

export class M3CreateUniqueConstraints implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createUniqueConstraint(
            'category',new TableUnique({columnNames: ['name', 'user_id']})
        )
        await queryRunner.createUniqueConstraint(
            'user',new TableUnique({columnNames: ['login']})
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('record',['registry_at', 'due_date', 'paid'])
    }
}
