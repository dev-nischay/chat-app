import {
  Router,
  type NextFunction,
  type Response,
  type Request,
} from "express";
import {
  createRoomSchema,
  joinRoomSchema,
  type createBody,
  type joinBody,
} from "./schema.js";

import { AppError } from "./utils.js";
import { MemoryState } from "./memoryDb.js";
import { Httpstatus } from "./types.js";
export const roomRouter = Router();

roomRouter.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = createRoomSchema.safeParse(req.body);

      if (!parsed.success) {
        return next(new AppError("Invalid Input", Httpstatus.BadRequset));
      }

      const { type, payload } = parsed.data as createBody;

      if (type === "create") {
        let alreadyExist = MemoryState.get(payload.roomId);

        if (alreadyExist) {
          return next(
            new AppError(
              "Room Already Exits kindly join",
              Httpstatus.BadRequset
            )
          );
        }

        MemoryState.set(payload.roomId, {
          // Room creation
          users: new Set(),
        });
        console.log(MemoryState);

        return res.json({
          status: true,
          message: `Room Created with Id ${payload.roomId}`,
        });
      } else {
        return res.status(Httpstatus.BadRequset).json({
          message: "Incorrect type for create endpoint",
        });
      }
    } catch (error) {
      console.log(`Error while creating a room ${error}`);
      return next(
        new AppError("Something weent wrong", Httpstatus.InternalServerError)
      );
    }
  }
);

roomRouter.post("/join", (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = joinRoomSchema.safeParse(req.body);

    if (!parsed.success) {
      return next(new AppError("Invalid Input ", Httpstatus.BadRequset));
    }

    const { type, payload } = parsed.data as joinBody;

    if (type === "join") {
      let exist = MemoryState.get(payload.roomId);

      if (!exist) {
        return next(
          new AppError(
            `Room with id ${payload.roomId} does not exist`,
            Httpstatus.BadRequset
          )
        );
      }

      return res.json({
        status: true,
        message: "Room Existence Confirmed",
      });
    } else {
      return res.status(Httpstatus.BadRequset).json({
        message: "Incorrect type for join endpoint",
      });
    }
  } catch (error) {
    console.log(`Error while joining a room ${error}`);
    return next(
      new AppError("Something weent wrong", Httpstatus.InternalServerError)
    );
  }
});
