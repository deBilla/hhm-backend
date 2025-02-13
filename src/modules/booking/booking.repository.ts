import {PostgresRepository} from "../../core/databases/postgres/postgres.repository";
import configurations from "../../server-config/configurations";
import {BookingEntity} from "./entities/booking.entity";

export class BookingRepository extends PostgresRepository<BookingEntity> {
  constructor() {
    super(configurations().postgres.bookingTable);
  }

  protected docToEntity(
    doc: any
  ): BookingEntity {
    const metadata = new BookingEntity({
      uuid: doc.get("uuid") || "",
      fullName: doc.get("full_name") || "",
    } as BookingEntity);

    return metadata;
  }
}
