import {PaymentRepository} from "./payment.repository";
import {PaymentRequest} from "./dto/payment-request.dto";
import {PaymentEntity} from "./entities/payment.entity";
export class PaymentController {
  paymentRepository: PaymentRepository;

  constructor() {
    this.paymentRepository = new PaymentRepository();
  }

  async createPayment(req: PaymentRequest) {
    const payment = new PaymentEntity({
      fullName: req.full_name,
    } as PaymentEntity);
    await this.paymentRepository.create(payment);

    return payment;
  }

  async deletePayment(uuid: string) {
    const payment = await this.paymentRepository.findOne(uuid);
    if (!payment) throw new Error("<Payment> not found in database !!!");

    await this.paymentRepository.delete(uuid);
  }

  async getAll() {
    const modules: PaymentEntity[] = await this.paymentRepository.find();

    if (!modules || modules.length <= 0) return [];

    return modules.map((payment: PaymentEntity) => payment.toTransformedObject());
  }

  async getOne(uuid: string) {
    const payment: PaymentEntity = await this.paymentRepository.findOne(uuid);

    return payment.toTransformedObject();
  }
}
