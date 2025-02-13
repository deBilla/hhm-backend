import {HelperVerificationRepository} from "./helper-verification.repository";
import {HelperVerificationRequest} from "./dto/helper-verification-request.dto";
import {HelperVerificationEntity} from "./entities/helper-verification.entity";
export class HelperVerificationController {
  helperVerificationRepository: HelperVerificationRepository;

  constructor() {
    this.helperVerificationRepository = new HelperVerificationRepository();
  }

  async createHelperVerification(req: HelperVerificationRequest) {
    const helperVerification = new HelperVerificationEntity({
      fullName: req.full_name,
    } as HelperVerificationEntity);
    await this.helperVerificationRepository.create(helperVerification);

    return helperVerification;
  }

  async deleteHelperVerification(uuid: string) {
    const helperVerification = await this.helperVerificationRepository.findOne(uuid);
    if (!helperVerification) throw new Error("<HelperVerification> not found in database !!!");

    await this.helperVerificationRepository.delete(uuid);
  }

  async getAll() {
    const modules: HelperVerificationEntity[] = await this.helperVerificationRepository.find();

    if (!modules || modules.length <= 0) return [];

    return modules.map((helperVerification: HelperVerificationEntity) => helperVerification.toTransformedObject());
  }

  async getOne(uuid: string) {
    const helperVerification: HelperVerificationEntity = await this.helperVerificationRepository.findOne(uuid);

    return helperVerification.toTransformedObject();
  }
}
