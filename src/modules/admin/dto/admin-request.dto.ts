import Joi from "joi";

export interface AdminRequest {
  full_name: string;
}

export const AdminSchema = Joi.object<AdminRequest>({
  full_name: Joi.string().required(),
});
