import {PostgresRepository} from "../../core/databases/postgres/postgres.repository";
import configurations from "../../server-config/configurations";
import {AdminEntity} from "./entities/admin.entity";

export class AdminRepository extends PostgresRepository<AdminEntity> {
  constructor() {
    super(configurations().postgres.adminTable);
  }

  protected docToEntity(doc: any): AdminEntity {
    return AdminEntity.fromRequest(doc);
  }
}
