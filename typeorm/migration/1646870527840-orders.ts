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

        await queryRunner.createTable(new Table({
            name: 'item_ingredients',
            columns: [
                columnId,    
                {
                    name: 'ingredient_price',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                },
                {
                    name: 'orderItemId',
                    type: 'int',
                },
                {
                    name: 'ingredientId',
                    type: 'int',
                },
                columnCreatedAt,
                columnUpdatedAt,
            ],
        }));

        await queryRunner.createForeignKey('item_ingredients', new TableForeignKey({
            columnNames: ['orderItemId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'order_items',
            name: 'FK_item_ingredients_order_items',
            onDelete: 'CASCADE',
        }));
        
        await queryRunner.createForeignKey('item_ingredients', new TableForeignKey({
            columnNames: ['ingredientId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'ingredients',
            name: 'FK_item_ingredients_ingredients',
            onDelete: 'CASCADE',
        }));

        const orders = [
            {
                id: 1,
                userId: 1,
                statusId: 3,
                total: 57.91,
                items: [
                    {
                        id: 1,
                        name: 'Burguer extra',
                        ingredients: [1, 4, 5],
                    },
                ],
            },
            {
                id: 2,
                userId: 1,
                statusId: 1,
                total: 45.79,
                items: [
                    {
                        id: 2,
                        name: 'oBurguer especial',
                        ingredients: [3, 6, 7],
                    },
                ],
            }
        ];

        for (const order of orders) {
            const { id, userId, statusId, total, items } = order;

            await queryRunner.query(`INSERT INTO orders(total, userId, statusId) VALUES ('${total}', ${userId}, ${statusId});`);

            for (const item of items) {
                await queryRunner.query(`INSERT INTO order_items(orderId, name) VALUES (${id}, '${item.name}');`);
            
                for (const ingredient of item.ingredients) {
                    await queryRunner.query(`INSERT INTO item_ingredients(orderItemId, ingredientId, ingredient_price) VALUES (${item.id}, ${ingredient}, 5.67);`);
                }
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('item_ingredients', 'FK_item_ingredients_order_items');
        await queryRunner.dropForeignKey('item_ingredients', 'FK_item_ingredients_ingredients');
        await queryRunner.dropTable('item_ingredients');
        await queryRunner.dropForeignKey('order_items', 'FK_order_items_orders');
        await queryRunner.dropTable('order_items');
        await queryRunner.dropForeignKey('orders', 'FK_orders_users');
        await queryRunner.dropForeignKey('orders', 'FK_orders_order_statuses');
        await queryRunner.dropTable('orders');
        await queryRunner.dropTable('order_statuses');
    }
}
