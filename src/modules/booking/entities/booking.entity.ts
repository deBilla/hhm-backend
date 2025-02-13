import {IEntity} from "../../../core/entity/entity.interface";
import {v4 as uuidv4} from "uuid";
import {transformToSnakeCase} from "../../../core/entity/entity.tranformer";

export class BookingEntity implements IEntity {
  uuid!: string;
  fullName!: string;

  constructor(data: BookingEntity) {
    this.uuid = data.uuid || uuidv4();
    this.fullName = data.fullName || "";
  }

  getId(): string {
    return this.uuid;
  }

  toDatabaseObject() {
    return this.toTransformedObject();
  }

  toTransformedObject() {
    return transformToSnakeCase({
      uuid: this.uuid || uuidv4(),
      fullName: this.fullName || "",
    });
  }
}
