import { z } from "zod";

export const joinRoomSchema = z.object({
  type: z.string(),
  payload: z.object({
    roomId: z.string(),
  }),
});

export const createRoomSchema = z.object({
  type: z.string(),
  payload: z.object({
    roomId: z.string(),
  }),
});

export type joinBody = z.infer<typeof joinRoomSchema>;
export type createBody = z.infer<typeof createRoomSchema>;
