import {HelperRepository} from "./helper.repository";
import {HelperRequest} from "./dto/helper-request.dto";
import {HelperEntity} from "./entities/helper.entity";
export class HelperController {
  helperRepository: HelperRepository;

  constructor() {
    this.helperRepository = new HelperRepository();
  }

  async createHelper(newHelper: HelperRequest) {
    return await this.helperRepository.create(HelperEntity.fromRequest(newHelper));
  }

  async updateHelper(updatedHelper: HelperRequest) {
    const helper = HelperEntity.fromRequest(updatedHelper);
    return await this.helperRepository.update(helper.uuid, helper);
  }

  async deleteHelper(uuid: string) {
    const helper = await this.helperRepository.findOne(uuid);
    if (!helper) throw new Error("<Helper> not found in database !!!");

    await this.helperRepository.delete(uuid);
  }

  async getAll() {
    const modules: HelperEntity[] = await this.helperRepository.find();

    if (!modules || modules.length <= 0) return [];

    return modules.map((helper: HelperEntity) => helper.toTransformedObject());
  }

  async getOne(uuid: string) {
    const helper: HelperEntity = await this.helperRepository.findOne(uuid);

    return helper.toTransformedObject();
  }
}
