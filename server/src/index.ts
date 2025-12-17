import { WebSocketServer } from "ws";
import WebSocket from "ws";
const wss = new WebSocketServer({ port: 8080 });

interface User {
  room: string;
  socket: WebSocket;
}

type UserResponse = {
  // from the client
  type: "join" | "chat";
  payload: {
    roomId?: string;
    message?: string;
  };
};

const allSockets: User[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (message: string) => {
    const { type, payload }: UserResponse = JSON.parse(message);

    if (type === "join" && payload.roomId && payload.roomId!?.length > 0) {
      allSockets.push({
        room: payload.roomId,
        socket: socket, // think of  socket is a user
      });
      console.log("Room created");
      socket.send(`Room created with id ${payload.roomId} `);
    }

    if (type === "chat") {
      const currentUserRoom = allSockets.find((e) => e.socket === socket);

      if (currentUserRoom && payload.message && payload.message?.length > 0) {
        const room = allSockets.filter(
          (e) => e.room === currentUserRoom.room && e.socket !== socket
        );

        room.forEach((e) => e.socket.send(payload.message!));
      } else {
        socket.send("Invalid User kindly join a room first to chat");
      }
    }
  });

  socket.on("close", () => {
    console.log("socket disconnected");
    socket.send("Chat Terminated");
  });
});
// server crashing on invalid data
// irregular logs
// if users joins again old connection must be terminated
