import {IEntity} from "../../../core/entity/entity.interface";
import {v4 as uuidv4} from "uuid";
import {transformToSnakeCase} from "../../../core/entity/entity.tranformer";
import {HelperRequest} from "../dto/helper-request.dto";

export class HelperEntity implements IEntity {
  uuid!: string;
  fullName!: string;
  email!: string;
  phone!: string;
  dateOfBirth!: string;
  gender!: string;
  address!: string;
  qualification!: string;
  experienceYears!: number;
  verificationStatus!: string;
  profilePhotoUrl!: string;

  constructor(data: Partial<HelperEntity> = {}) {
    this.uuid = data.uuid || uuidv4();
    this.fullName = data.fullName || "";
    this.email = data.email || "";
    this.phone = data.phone || "";
    this.dateOfBirth = data.dateOfBirth || "";
    this.gender = data.gender || "Other";
    this.address = data.address || "";
    this.qualification = data.qualification || "";
    this.experienceYears = data.experienceYears || 0;
    this.verificationStatus = data.verificationStatus || "Pending";
    this.profilePhotoUrl = data.profilePhotoUrl || "";
  }

  getId(): string {
    return this.uuid;
  }

  static fromRequest(req: HelperRequest): HelperEntity {
    const entity = new HelperEntity();
    const toSnakeCase = (str: string) =>
      str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

    Object.keys(entity).forEach((key) => {
      const snakeKey = toSnakeCase(key);
      (entity as any)[key] = req[snakeKey as keyof HelperRequest] || (entity as any)[key];
    });

    return entity;
  }

  toDatabaseObject() {
    return this.toTransformedObject();
  }

  toTransformedObject() {
    return transformToSnakeCase({...this});
  }
}
