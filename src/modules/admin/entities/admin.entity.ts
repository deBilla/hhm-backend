import {IEntity} from "../../../core/entity/entity.interface";
import {v4 as uuidv4} from "uuid";
import {transformToSnakeCase} from "../../../core/entity/entity.tranformer";
import {AdminRequest} from "../dto/admin-request.dto";

export class AdminEntity implements IEntity {
  uuid!: string;
  fullName!: string;
  email!: string;
  passwordHash!: string;
  role!: string;

  constructor(data: Partial<AdminEntity> = {}) {
    this.uuid = data.uuid || uuidv4();
    this.fullName = data.fullName || "";
    this.email = data.email || "";
    this.passwordHash = data.passwordHash || "";
    this.role = data.role || "Support";
  }

  static fromRequest(req: AdminRequest): AdminEntity {
    const entity = new AdminEntity();
    const toSnakeCase = (str: string) =>
      str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

    Object.keys(entity).forEach((key) => {
      const snakeKey = toSnakeCase(key);
      (entity as any)[key] = req[snakeKey as keyof AdminRequest] || (entity as any)[key];
    });

    return entity;
  }

  getId(): string {
    return this.uuid;
  }

  toDatabaseObject() {
    return this.toTransformedObject();
  }

  toTransformedObject() {
    return transformToSnakeCase({...this});
  }
}
