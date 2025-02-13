import Joi from "joi";

export interface BookingRequest {
  full_name: string;
}

export const BookingSchema = Joi.object<BookingRequest>({
  full_name: Joi.string().required(),
});
