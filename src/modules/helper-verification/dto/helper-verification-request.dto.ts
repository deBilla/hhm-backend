import Joi from "joi";

export interface HelperVerificationRequest {
  full_name: string;
}

export const HelperVerificationSchema = Joi.object<HelperVerificationRequest>({
  full_name: Joi.string().required(),
});
