import {PostgresRepository} from "../../core/databases/postgres/postgres.repository";
import configurations from "../../server-config/configurations";
import {HelperVerificationEntity} from "./entities/helper-verification.entity";

export class HelperVerificationRepository extends PostgresRepository<HelperVerificationEntity> {
  constructor() {
    super(configurations().postgres.helperVerificationTable);
  }

  protected docToEntity(
    doc: any
  ): HelperVerificationEntity {
    const metadata = new HelperVerificationEntity({
      uuid: doc.get("uuid") || "",
      fullName: doc.get("full_name") || "",
    } as HelperVerificationEntity);

    return metadata;
  }
}
