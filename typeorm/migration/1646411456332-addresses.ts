import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import { columnCreatedAt, columnId, columnUpdatedAt} from "../columns";
import { columnVarchar } from "../columns/columnVarchar";

export class addresses1646411456332 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'addresses',
            columns: [
                columnId,
                columnVarchar("street","250"),
                columnVarchar("number", "16", true),
                columnVarchar("complement", "250", true),
                columnVarchar("district","250"),
                columnVarchar("city","250"),
                columnVarchar("state","250"),
                columnVarchar("country","250"),
                columnVarchar("zipcode", "8", false),
                {
                    name: "personId",
                    type: "int",
                    isNullable: false,
                },
                columnCreatedAt,
                columnUpdatedAt,
            ]
        }));

        await queryRunner.createForeignKey("addresses", new TableForeignKey({
            columnNames: ["personId"],
            referencedColumnNames: ["id"],
            referencedTableName: "persons",
            onDelete: "CASCADE",
            name: "FK_addresses_persons",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("addresses", "FK_addresses_persons");
        await queryRunner.dropTable("addresses");
    }

}
