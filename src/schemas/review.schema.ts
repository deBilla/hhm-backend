import Joi from "joi";

export interface ReviewRequest {
  helper_id: string;
  patient_id: string;
  rating: number;
  comment: string?;
}

export const ReviewSchema = Joi.object<ReviewRequest>({
  helper_id: Joi.string().required(),
  patient_id: Joi.string().required(),
  rating: Joi.number().required(),
  comment: Joi.string().optional(),
});