import { MigrationInterface, QueryRunner, Table, TableForeignKey, } from "typeorm";

export class ingredients1646354789855 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "ingredient_types",
            columns: [{
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment"
            }, {
                name: "name",
                type: "varchar",
                length: "250",
                isNullable: false,
            }]
        }));

        await queryRunner.createTable(new Table({
            name: "ingredients",
            columns: [{
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment"
            }, {
                name: "name",
                type: "varchar",
                length: "250",
                isNullable: false,
            }, {
                name: "price",
                type: "decimal",
                precision: 10,
                scale: 2,
                default: 0,
            }, {
                name: 'type_id',
                type: 'int',
                isNullable: false,
            }, {
                name: "available",
                type: "tinyint",
                isNullable: false,
            }, {
                name: "createdAt",
                type: "datetime",
                default: "CURRENT_TIMESTAMP"
            }, {
                name: "updatedAt",
                type: "datetime",
                default: "CURRENT_TIMESTAMP"
            }]

        }));

        await queryRunner.createForeignKey('ingredients', new TableForeignKey({
            columnNames: ['type_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'ingredient_types',
            name: 'FK_ingredients_ingredients_types',
            onDelete: 'CASCADE',
        }));

        const ingredientTypes = ['Padrão', 'Pão'];

        for (let index = 0; index < ingredientTypes.length; index++) {
            await queryRunner.query(`INSERT INTO  ingredient_types(name) VALUES ('${ingredientTypes[index]}');`);
        }

        const ingredients = [
          {
            name: 'Pão Tradicional',
            price: 2.00,
            typeId: 2,
          },
          {
            name: 'Pão de Batata',
            price: 3.00,
            typeId: 2,
          },
          {
            name: 'Pão italiano',
            price: 5.00,
            typeId: 2,
          },
          {
            name: 'Queijo Mussarela',
            price: 4.00,
            typeId: 1,
          },
          {
            name:  'Tomate',
            price: 5.00,
            typeId: 1,
          },
          {
            name: 'Carne de Frango 130g',
            price: 4.00,
            typeId: 1,
          },
          {
            name: 'Alface',
            price: 4.00,
            typeId: 1,
          },
        ];

        for (let index = 0; index < ingredients.length; index++) {
            const { name, price, typeId } = ingredients[index];

            await queryRunner.query(`INSERT INTO ingredients(name, price, type_id, available) VALUES ('${name}', '${price}', ${typeId}, 1);`);
        }

    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("ingredients", "FK_ingredients_ingredients_types")
        await queryRunner.dropTable("ingredients")
        await queryRunner.dropTable("ingredient_types")
    }

}
