import {PatientRepository} from "./patient.repository";
import {PatientRequest} from "./dto/patient-request.dto";
import {PatientEntity} from "./entities/patient.entity";
export class PatientController {
  patientRepository: PatientRepository;

  constructor() {
    this.patientRepository = new PatientRepository();
  }

  async createPatient(req: PatientRequest) {
    const patient = new PatientEntity({
      fullName: req.full_name,
    } as PatientEntity);
    await this.patientRepository.create(patient);

    return patient;
  }

  async deletePatient(uuid: string) {
    const patient = await this.patientRepository.findOne(uuid);
    if (!patient) throw new Error("<Patient> not found in database !!!");

    await this.patientRepository.delete(uuid);
  }

  async getAll() {
    const modules: PatientEntity[] = await this.patientRepository.find();

    if (!modules || modules.length <= 0) return [];

    return modules.map((patient: PatientEntity) => patient.toTransformedObject());
  }

  async getOne(uuid: string) {
    const patient: PatientEntity = await this.patientRepository.findOne(uuid);

    return patient.toTransformedObject();
  }
}
