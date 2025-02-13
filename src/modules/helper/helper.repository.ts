import {PostgresRepository} from "../../core/databases/postgres/postgres.repository";
import configurations from "../../server-config/configurations";
import {HelperEntity} from "./entities/helper.entity";

export class HelperRepository extends PostgresRepository<HelperEntity> {
  constructor() {
    super(configurations().postgres.helperTable);
  }

  protected docToEntity(
    doc: any
  ): HelperEntity {
    const metadata = new HelperEntity({
      uuid: doc.get("uuid") || "",
      fullName: doc.get("full_name") || "",
    } as HelperEntity);

    return metadata;
  }
}
