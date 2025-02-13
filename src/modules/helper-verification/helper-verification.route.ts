import {Request, Response, Router} from "express";
import {
  ResponseType,
  sendErrorResponse,
  sendSuccessResponse,
} from "../../core/models/response/response.model";
import {HelperVerificationController} from "./helper-verification.controller";
import {validateRequest} from "../../core/middlewares/validate-request";
import {HelperVerificationSchema} from "./dto/helper-verification-request.dto";

const helperVerificationRouter = Router();

const helperVerificationController = new HelperVerificationController();

helperVerificationRouter.post("/", validateRequest(HelperVerificationSchema), async (req: Request, res: Response) => {
  try {
    const helperVerificationRequest = req.body;

    const payload = await helperVerificationController.createHelperVerification(
      helperVerificationRequest,
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

helperVerificationRouter.get("/", async (req: Request, res: Response) => {
  try {
    const payload = await helperVerificationController.getAll();

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

helperVerificationRouter.get("/:uuid", async (req: Request, res: Response) => {
  try {
    const uuid = req.params.uuid;

    if (!uuid) {
      throw new Error("UUID is required.");
    }

    const payload = await helperVerificationController.getOne(uuid);

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


helperVerificationRouter.delete("/:uuid", async (req: Request, res: Response) => {
  try {
    const uuid = req.params.uuid;

    if (!uuid) throw new Error("UUID needed");
    await helperVerificationController.deleteHelperVerification(uuid);

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

export default helperVerificationRouter;
