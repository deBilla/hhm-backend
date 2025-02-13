import Joi from "joi";

export interface PaymentRequest {
  full_name: string;
}

export const PaymentSchema = Joi.object<PaymentRequest>({
  full_name: Joi.string().required(),
});
