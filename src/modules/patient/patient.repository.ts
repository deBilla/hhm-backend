import {PostgresRepository} from "../../core/databases/postgres/postgres.repository";
import configurations from "../../server-config/configurations";
import {PatientEntity} from "./entities/patient.entity";

export class PatientRepository extends PostgresRepository<PatientEntity> {
  constructor() {
    super(configurations().postgres.patientTable);
  }

  protected docToEntity(
    doc: any
  ): PatientEntity {
    const metadata = new PatientEntity({
      uuid: doc.get("uuid") || "",
      fullName: doc.get("full_name") || "",
    } as PatientEntity);

    return metadata;
  }
}
