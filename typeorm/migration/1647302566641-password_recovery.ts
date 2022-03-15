import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { columnCreatedAt, columnId, columnUpdatedAt } from "../columns";

export class passwordRecovery1647302566641 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'password_recovery',
                columns: [
                    columnId,
                    {
                        name: 'token',
                        type: 'varchar',
                        length: '250',
                        isNullable: false,
                    },
                    {
                        name: 'user_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'resetAt',
                        type: 'datetime',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    columnCreatedAt,
                    columnUpdatedAt,
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('password_recovery');
    }
}
