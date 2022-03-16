import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { columnCreatedAt, columnId, columnUpdatedAt, columnVarchar } from '../columns';

export class passwordRecovery1647302566641 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'password_recoveries',
        columns: [
          columnId,
          columnVarchar('token', '250'),
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'resetAt',
            type: 'datetime',
            isNullable: true,
          },
          columnCreatedAt,
          columnUpdatedAt,
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'password_recoveries',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        name: 'FK_password_recoveries_users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('password_recoveries');
  }
}
