import Joi from "joi";

export interface HelperRequest {
  full_name: string;
}

export const HelperSchema = Joi.object<HelperRequest>({
  full_name: Joi.string().required(),
});
