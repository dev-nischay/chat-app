import { create } from "zustand";
import type { RoomStore } from "./store.types";

export const useRoomStore = create<RoomStore>((set) => ({
  roomId: "",

  setRoomId: (id: string) => set({ roomId: id }),
}));
