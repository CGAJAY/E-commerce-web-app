import { Router } from "express";
import { validatePaymentDetails } from "../../Middlewares/paymentValidator.js";
import { payment } from "../../controllers/payment.js";
const paymentRouter = Router();

// /api/v1/payment/process
paymentRouter.post(
	"/process",
	validatePaymentDetails,
	payment
);

export { paymentRouter };
