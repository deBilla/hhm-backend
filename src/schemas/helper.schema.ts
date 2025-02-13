import Joi from "joi";

export interface HelperRequest {
  full_name: string;
  email: string;
  phone: string;
  date_of_birth: date;
  gender: "Male" | "Female" | "Other";
  address: string?;
  qualification: string?;
  experience_years: number?;
  verification_status: "Pending" | "Verified" | "Rejected";
  profile_photo_url: string?;
}

export const HelperSchema = Joi.object<HelperRequest>({
  full_name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  date_of_birth: Joi.string().isoDate().required(),
  gender: Joi.any(),
  address: Joi.string().optional(),
  qualification: Joi.string().optional(),
  experience_years: Joi.number().optional(),
  verification_status: Joi.any(),
  profile_photo_url: Joi.string().optional(),
});