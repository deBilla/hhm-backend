import Joi from "joi";

export interface AdminRequest {
  full_name: string;
  email: string;
  password_hash: string;
  role: "SuperAdmin" | "Verifier" | "Support";
}

export const AdminSchema = Joi.object<AdminRequest>({
  full_name: Joi.string().required(),
  email: Joi.string().required(),
  password_hash: Joi.string().required(),
  role: Joi.any(),
});