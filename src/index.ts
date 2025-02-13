import reviewRouter from "./modules/review/review.route";
import paymentRouter from "./modules/payment/payment.route";
import bookingRouter from "./modules/booking/booking.route";
import patientRouter from "./modules/patient/patient.route";
import helperVerificationRouter from "./modules/helper-verification/helper-verification.route";
import helperRouter from "./modules/helper/helper.route";
import adminRouter from "./modules/admin/admin.route";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/v1/review', reviewRouter);
app.use('/v1/payment', paymentRouter);
app.use('/v1/booking', bookingRouter);
app.use('/v1/patient', patientRouter);
app.use('/v1/helper-verification', helperVerificationRouter);
app.use('/v1/helper', helperRouter);
app.use('/v1/admin', adminRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
