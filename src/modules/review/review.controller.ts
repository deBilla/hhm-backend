import {ReviewRepository} from "./review.repository";
import {ReviewRequest} from "./dto/review-request.dto";
import {ReviewEntity} from "./entities/review.entity";
export class ReviewController {
  reviewRepository: ReviewRepository;

  constructor() {
    this.reviewRepository = new ReviewRepository();
  }

  async createReview(req: ReviewRequest) {
    const review = new ReviewEntity({
      fullName: req.full_name,
    } as ReviewEntity);
    await this.reviewRepository.create(review);

    return review;
  }

  async deleteReview(uuid: string) {
    const review = await this.reviewRepository.findOne(uuid);
    if (!review) throw new Error("<Review> not found in database !!!");

    await this.reviewRepository.delete(uuid);
  }

  async getAll() {
    const modules: ReviewEntity[] = await this.reviewRepository.find();

    if (!modules || modules.length <= 0) return [];

    return modules.map((review: ReviewEntity) => review.toTransformedObject());
  }

  async getOne(uuid: string) {
    const review: ReviewEntity = await this.reviewRepository.findOne(uuid);

    return review.toTransformedObject();
  }
}
