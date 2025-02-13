import {PostgresRepository} from "../../core/databases/postgres/postgres.repository";
import configurations from "../../server-config/configurations";
import {AdminEntity} from "./entities/admin.entity";

export class AdminRepository extends PostgresRepository<AdminEntity> {
  constructor() {
    super(configurations().postgres.adminTable);
  }

  protected docToEntity(doc: any): AdminEntity {
    const toSnakeCase = (str: string) =>
      str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  
    const entity = new AdminEntity({} as AdminEntity);
  
    Object.keys(entity).forEach((key) => {
      const snakeKey = toSnakeCase(key);
      (entity as any)[key] = doc[snakeKey] || "";
    });
  
    return entity;
  }
}
