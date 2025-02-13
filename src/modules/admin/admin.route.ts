import {Request, Response, Router} from "express";
import {
  ResponseType,
  sendErrorResponse,
  sendSuccessResponse,
} from "../../core/models/response/response.model";
import {AdminController} from "./admin.controller";
import {validateRequest} from "../../core/middlewares/validate-request";
import {AdminSchema} from "./dto/admin-request.dto";

const adminRouter = Router();

const adminController = new AdminController();

adminRouter.post("/", validateRequest(AdminSchema), async (req: Request, res: Response) => {
  try {
    const adminRequest = req.body;

    const payload = await adminController.createAdmin(
      adminRequest,
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

adminRouter.get("/", async (req: Request, res: Response) => {
  try {
    const payload = await adminController.getAll();

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

adminRouter.get("/:uuid", async (req: Request, res: Response) => {
  try {
    const uuid = req.params.uuid;

    if (!uuid) {
      throw new Error("UUID is required.");
    }

    const payload = await adminController.getOne(uuid);

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


adminRouter.delete("/:uuid", async (req: Request, res: Response) => {
  try {
    const uuid = req.params.uuid;

    if (!uuid) throw new Error("UUID needed");
    await adminController.deleteAdmin(uuid);

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

export default adminRouter;
