import { TableColumnOptions } from "typeorm";

export const columnUpdatedAt = {
  name: 'updatedAt',
  type: 'datetime',
  default: 'CURRENT_TIMESTAMP',
  isNullable: true,
} as TableColumnOptions;