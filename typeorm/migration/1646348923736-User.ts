import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import { columnCreatedAt, columnId, columnUpdatedAt } from "../columns";
import * as bcrypt from 'bcrypt';

export class User1646348923736 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'persons',
            columns: [
                columnId,
                {
                    name: 'name',
                    type: 'varchar',
                    length: '250',
                    isNullable: false,
                },
                columnCreatedAt,
                columnUpdatedAt,
            ],
        }));

        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                columnId,
                {
                    name: 'email',
                    type: 'varchar',
                    length: '120',
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'photo',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'personId',
                    type: 'int',
                },
                columnCreatedAt,
                columnUpdatedAt,
            ],
        }));

        await queryRunner.createForeignKey('users', new TableForeignKey({
            columnNames: ['personId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'persons',
            name: 'FK_users_persons',
            onDelete: 'CASCADE',
        }));
        
        await queryRunner.query("INSERT INTO persons(name) VALUES ('John Doe')");
        
        const password = bcrypt.hashSync('123456', 10);
        
        await queryRunner.query(`INSERT INTO users(email, password, personId) VALUES ('john.doe@gmail.com', '${password}', '1')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users', 'FK_users_persons');
        await queryRunner.dropTable('users');
        await queryRunner.dropTable('persons');
    }

}
