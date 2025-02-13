import Joi from "joi";

export interface ReviewRequest {
  full_name: string;
}

export const ReviewSchema = Joi.object<ReviewRequest>({
  full_name: Joi.string().required(),
});
