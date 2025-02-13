import Joi from "joi";

export interface PatientRequest {
  full_name: string;
  phone: string;
  address: string?;
  emergency_contact: string?;
  medical_conditions: string?;
}

export const PatientSchema = Joi.object<PatientRequest>({
  full_name: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().optional(),
  emergency_contact: Joi.string().optional(),
  medical_conditions: Joi.string().optional(),
});