
import { TypeOrmModule } from "@nestjs/typeorm";
import { MigrationInterface, QueryRunner, Table, } from "typeorm";

export class ingredients1646354789855 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
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
                isUnique: true,
            }, {
                name: "type",
                type: "tinyint",
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
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("ingredients")
    }

}
