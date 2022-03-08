import { TableColumnOptions } from "typeorm";

export function columnVarchar(name: string = "name", length: string = "255", canBeNull: boolean = false) {

    return {
        name,
        type: 'varchar',
        isNullable: canBeNull,
        length,
    } as TableColumnOptions

}