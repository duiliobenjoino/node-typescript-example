import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class M2AdjustTableRecords implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('record',
        [
            new TableColumn({name: 'registry_at', type: 'timestamp', isNullable: false, default: "now()"}),
            new TableColumn({name: 'due_date', type: 'date', isNullable: false}),
            new TableColumn({name: 'paid', type: 'Boolean', isNullable: false, default: true})
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('record',['registry_at', 'due_date', 'paid'])
    }
}
