import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class itemIngredients1646357184185 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "item_ingredients",
            columns:[{
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment"
            }, {
                name: "ingredient_price",
                type: "decimal",
                precision: 10,
                scale: 2,
                default: 0,
            }, {
                name: "createdAt",
                type: "datetime",
                default: "CURRENT_TIMESTAMP"
            }, {
                name: "updatedAt",
                type: "datetime",
                default: "CURRENT_TIMESTAMP"
            }] 
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
