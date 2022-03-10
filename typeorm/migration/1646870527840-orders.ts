import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";
import { columnId, columnVarchar, columnCreatedAt, columnUpdatedAt } from "../columns";

export class orders1646870527840 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'order_statuses',
            columns: [
                columnId,
                columnVarchar('name', '45'),
                columnCreatedAt,
                columnUpdatedAt,
            ],
        }));

        const statusList = ['Aguardando pagamento', 'Pagamento aprovado', 'Entregue'];

        for (let i = 0; i < statusList.length; i++) {
            await queryRunner.query(`INSERT INTO order_statuses(name) VALUES ('${statusList[i]}');`);
        }

        await queryRunner.createTable(new Table({
            name: 'orders',
            columns: [
                columnId,
                {
                    name: 'total',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                },
                {
                    name: 'statusId',
                    type: 'int',
                },
                {
                    name: 'userId',
                    type: 'int',
                },
                columnCreatedAt,
                columnUpdatedAt,
            ],
        }));

        await queryRunner.createForeignKey('orders', new TableForeignKey({
            columnNames: ['statusId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'order_statuses',
            name: 'FK_orders_order_statuses',
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('orders', new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            name: 'FK_orders_users',
            onDelete: 'CASCADE',
        }));

        await queryRunner.query(`INSERT INTO orders(total, userId, statusId) VALUES ('57.91', 1, 3), ('45.79', 1, 1);`);

        await queryRunner.createTable(new Table({
            name: 'order_items',
            columns: [
                columnId,
                columnVarchar('name', '60', true),
                {
                    name: 'orderId',
                    type: 'int',
                },
                columnCreatedAt,
                columnUpdatedAt,
            ],
        }));

        await queryRunner.createForeignKey('order_items', new TableForeignKey({
            columnNames: ['orderId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'orders',
            name: 'FK_order_items_orders',
            onDelete: 'CASCADE',
        }));

        await queryRunner.query(`INSERT INTO order_items(orderId, name) VALUES (1, 'Burguer extra'), (2, 'oBurguer especial');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('order_items');
        await queryRunner.dropForeignKey('orders', 'FK_orders_users');
        await queryRunner.dropForeignKey('orders', 'FK_orders_order_statuses');
        await queryRunner.dropTable('orders');
        await queryRunner.dropTable('order_statuses');
    }
}
