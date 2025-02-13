import {Request, Response, Router} from "express";
import {
  ResponseType,
  sendErrorResponse,
  sendSuccessResponse,
} from "../../core/models/response/response.model";
import {PaymentController} from "./payment.controller";
import {validateRequest} from "../../core/middlewares/validate-request";
import {PaymentSchema} from "./dto/payment-request.dto";

const paymentRouter = Router();

const paymentController = new PaymentController();

paymentRouter.post("/", validateRequest(PaymentSchema), async (req: Request, res: Response) => {
  try {
    const paymentRequest = req.body;

    const payload = await paymentController.createPayment(
      paymentRequest,
    );

    return sendSuccessResponse({
      type: ResponseType.HTTP,
      statusCode: 200,
      payload: payload,
      res,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error(error);
    return sendErrorResponse({
      type: ResponseType.HTTP,
      payload: err.message,
      res,
    });
  }
});

paymentRouter.get("/", async (req: Request, res: Response) => {
  try {
    const payload = await paymentController.getAll();

    return sendSuccessResponse({
      type: ResponseType.HTTP,
      statusCode: 200,
      payload: payload,
      res,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error(err);
    return sendErrorResponse({
      type: ResponseType.HTTP,
      payload: err.message,
      res,
    });
  }
});

paymentRouter.get("/:uuid", async (req: Request, res: Response) => {
  try {
    const uuid = req.params.uuid;

    if (!uuid) {
      throw new Error("UUID is required.");
    }

    const payload = await paymentController.getOne(uuid);

    if (!payload) {
      throw new Error("Resource not found.");
    }

    return sendSuccessResponse({
      type: ResponseType.HTTP,
      statusCode: 200,
      payload: payload,
      res,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error(err);
    return sendErrorResponse({
      type: ResponseType.HTTP,
      payload: err.message,
      res,
    });
  }
});


paymentRouter.delete("/:uuid", async (req: Request, res: Response) => {
  try {
    const uuid = req.params.uuid;

    if (!uuid) throw new Error("UUID needed");
    await paymentController.deletePayment(uuid);

    return sendSuccessResponse({
      type: ResponseType.HTTP,
      statusCode: 200,
      payload: true,
      res,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error(err);
    return sendErrorResponse({
      type: ResponseType.HTTP,
      payload: err.message,
      res,
    });
  }
});

export default paymentRouter;
