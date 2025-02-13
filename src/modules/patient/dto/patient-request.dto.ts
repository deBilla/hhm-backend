import Joi from "joi";

export interface PatientRequest {
  full_name: string;
}

export const PatientSchema = Joi.object<PatientRequest>({
  full_name: Joi.string().required(),
});
