import {PostgresRepository} from "../../core/databases/postgres/postgres.repository";
import configurations from "../../server-config/configurations";
import {HelperEntity} from "./entities/helper.entity";

export class HelperRepository extends PostgresRepository<HelperEntity> {
  constructor() {
    super(configurations().postgres.helperTable);
  }

  protected docToEntity(doc: any): HelperEntity {
    return HelperEntity.fromRequest(doc);
  }
}
