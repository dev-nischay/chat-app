import type WebSocket from "ws";

export type ClientResponse = {
  type: "join" | "chat" | "create";
  payload: {
    roomId?: string;
    message?: string;
  };
};

export type ServerResponse = {
  type: "error" | "response" | "broadcast";
  payload: {
    message: string;
  };
};

export enum Httpstatus {
  BadRequset = 400,
  InternalServerError = 500,
  NotFound = 404,
  Unauthorized = 403,
}

// attaching roomId to websocket interface
export interface ExtendedWebSocket extends WebSocket {
  roomId: string;
}
