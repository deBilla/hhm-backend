import {PostgresRepository} from "../../core/databases/postgres/postgres.repository";
import configurations from "../../server-config/configurations";
import {PaymentEntity} from "./entities/payment.entity";

export class PaymentRepository extends PostgresRepository<PaymentEntity> {
  constructor() {
    super(configurations().postgres.paymentTable);
  }

  protected docToEntity(
    doc: any
  ): PaymentEntity {
    const metadata = new PaymentEntity({
      uuid: doc.get("uuid") || "",
      fullName: doc.get("full_name") || "",
    } as PaymentEntity);

    return metadata;
  }
}
