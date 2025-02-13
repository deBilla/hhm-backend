import {PostgresRepository} from "../../core/databases/postgres/postgres.repository";
import configurations from "../../server-config/configurations";
import {ReviewEntity} from "./entities/review.entity";

export class ReviewRepository extends PostgresRepository<ReviewEntity> {
  constructor() {
    super(configurations().postgres.reviewTable);
  }

  protected docToEntity(
    doc: any
  ): ReviewEntity {
    const metadata = new ReviewEntity({
      uuid: doc.get("uuid") || "",
      fullName: doc.get("full_name") || "",
    } as ReviewEntity);

    return metadata;
  }
}
