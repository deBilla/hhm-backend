import Joi from "joi";

export interface BookingRequest {
  helper_id: string;
  patient_id: string;
  start_time: date;
  end_time: date;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
}

export const BookingSchema = Joi.object<BookingRequest>({
  helper_id: Joi.string().required(),
  patient_id: Joi.string().required(),
  start_time: Joi.string().isoDate().required(),
  end_time: Joi.string().isoDate().required(),
  status: Joi.any(),
});