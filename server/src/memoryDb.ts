import type WebSocket from "ws";

export const MemoryState = new Map<
  string,
  {
    users: Set<WebSocket>;
  }
>();
