import { WebSocketServer } from "ws";
import type { ClientResponse, ServerResponse } from "./types.js";
import { MemoryState } from "./memoryDb.js";
import type { ExtendedWebSocket } from "./types.js";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket: ExtendedWebSocket) => {
  console.log("User Connected");

  socket.send(
    JSON.stringify(<ServerResponse>{
      type: "broadcast",
      payload: {
        message: "Welcome to chat application",
      },
    })
  );

  socket.on("message", (message: string) => {
    const { type, payload }: ClientResponse = JSON.parse(message);

    if (type === "join" && payload.roomId && payload.roomId!?.length > 0) {
      const room = MemoryState.get(payload.roomId);

      if (!room) {
        return socket.send(
          JSON.stringify(<ServerResponse>{
            type: "error",
            payload: {
              message: "Room not found",
            },
          })
        );
      }
      room.users.add(socket);

      socket.roomId = payload.roomId;

      console.log(`User joined ${payload.roomId}`);
      //add brodcast that user have joined the room
    }

    if (type === "chat") {
      const currentUserRoom = socket.roomId;

      if (currentUserRoom && payload.message && payload.message?.length > 0) {
        const commonRoom = MemoryState.get(currentUserRoom);

        commonRoom?.users.forEach((e) => {
          if (e === socket) return;
          if (e.readyState !== WebSocket.OPEN) return;

          e.send(
            JSON.stringify(<ServerResponse>{
              type: "response",
              payload: { message: payload.message },
            })
          );
        });
      } else {
        let error: ServerResponse = {
          type: "error",
          payload: {
            message: "User not Found kindly join a room first",
          },
        };
        socket.send(JSON.stringify(error));
      }
    }
  });

  socket.on("error", (err: unknown) => {
    console.log(err);
  });

  socket.on("close", () => {
    console.log("socket disconnected");
    socket.send(
      JSON.stringify(<ServerResponse>{
        type: "broadcast",
        payload: {
          message: "Chat Terminated",
        },
      })
    );

    const currenSockets = MemoryState.get(socket.roomId);
    currenSockets?.users.delete(socket);
    console.log(currenSockets?.users.size);
  });
});

wss.on("error", (err) => {
  console.log("error" + err);
});
