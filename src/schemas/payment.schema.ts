import Joi from "joi";

export interface PaymentRequest {
  booking_id: string;
  amount: number;
  currency: "LKR";
  payment_status: "Pending" | "Paid" | "Failed" | "Refunded";
  payment_method: string?;
}

export const PaymentSchema = Joi.object<PaymentRequest>({
  booking_id: Joi.string().required(),
  amount: Joi.number().required(),
  currency: Joi.any(),
  payment_status: Joi.any(),
  payment_method: Joi.string().optional(),
});