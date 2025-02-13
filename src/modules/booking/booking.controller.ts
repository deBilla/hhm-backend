import {BookingRepository} from "./booking.repository";
import {BookingRequest} from "./dto/booking-request.dto";
import {BookingEntity} from "./entities/booking.entity";
export class BookingController {
  bookingRepository: BookingRepository;

  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(req: BookingRequest) {
    const booking = new BookingEntity({
      fullName: req.full_name,
    } as BookingEntity);
    await this.bookingRepository.create(booking);

    return booking;
  }

  async deleteBooking(uuid: string) {
    const booking = await this.bookingRepository.findOne(uuid);
    if (!booking) throw new Error("<Booking> not found in database !!!");

    await this.bookingRepository.delete(uuid);
  }

  async getAll() {
    const modules: BookingEntity[] = await this.bookingRepository.find();

    if (!modules || modules.length <= 0) return [];

    return modules.map((booking: BookingEntity) => booking.toTransformedObject());
  }

  async getOne(uuid: string) {
    const booking: BookingEntity = await this.bookingRepository.findOne(uuid);

    return booking.toTransformedObject();
  }
}
