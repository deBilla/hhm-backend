import {AdminRepository} from "./admin.repository";
import {AdminRequest} from "./dto/admin-request.dto";
import {AdminEntity} from "./entities/admin.entity";
export class AdminController {
  adminRepository: AdminRepository;

  constructor() {
    this.adminRepository = new AdminRepository();
  }

  async createAdmin(req: AdminRequest) {
    const admin = new AdminEntity({
      fullName: req.full_name,
    } as AdminEntity);
    await this.adminRepository.create(admin);

    return admin;
  }

  async deleteAdmin(uuid: string) {
    const admin = await this.adminRepository.findOne(uuid);
    if (!admin) throw new Error("<Admin> not found in database !!!");

    await this.adminRepository.delete(uuid);
  }

  async getAll() {
    const modules: AdminEntity[] = await this.adminRepository.find();

    if (!modules || modules.length <= 0) return [];

    return modules.map((admin: AdminEntity) => admin.toTransformedObject());
  }

  async getOne(uuid: string) {
    const admin: AdminEntity = await this.adminRepository.findOne(uuid);

    return admin.toTransformedObject();
  }
}
