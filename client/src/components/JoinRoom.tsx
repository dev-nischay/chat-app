import { Users } from "lucide-react";
import { useState } from "react";
import type { RoomProps } from "./CreateRoom";
import { useNavigate } from "react-router-dom";
import { useRoomStore } from "../context/roomStore";

export type UserResponse = {
  type: "chat" | "join";
  payload: {
    message?: string;
    roomId?: string;
  };
};

export const JoinRoom = ({ setMode }: RoomProps) => {
  const [roomCode, setRoomCode] = useState("");
  const setRoomId = useRoomStore((state) => state.setRoomId);
  const nav = useNavigate();

  const handleJoinRoom = async () => {
    if (roomCode.trim().length >= 5) {
      console.log("Joining room:", roomCode);
      alert(`Joining room: ${roomCode}`);

      try {
        const data = JSON.stringify({
          type: "join",
          payload: {
            roomId: roomCode,
          },
        });
        const response = await fetch("http://localhost:3000/room/join/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: data,
        });

        console.log(await response.json());

        if (response.ok) {
          setRoomId(roomCode);
          nav("/chat");
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-md relative z-10">
        <div className="bg-zinc-900 rounded-lg p-8 border border-zinc-800">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-white" />
            <h1 className="text-2xl font-bold text-white">Join Room</h1>
          </div>

          <p className="text-zinc-400 mb-6">
            Enter the room code to join an existing chat
          </p>

          <div className="mb-6">
            <label className="block text-zinc-500 text-sm mb-2">
              Room Code
            </label>
            <input
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              placeholder="Enter 6-digit code"
              maxLength={6}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white font-mono text-lg tracking-wider focus:outline-none focus:border-zinc-600 transition-colors"
            />
          </div>

          <button
            onClick={handleJoinRoom}
            disabled={roomCode.trim().length < 6}
            className="w-full bg-white text-black font-semibold py-3 px-4 rounded-lg hover:bg-zinc-200 transition-colors mb-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
          >
            Join Room
          </button>

          <button
            onClick={() => {
              setMode(null);
              setRoomCode("");
            }}
            className="w-full bg-zinc-800 text-white font-semibold py-3 px-4 rounded-lg hover:bg-zinc-700 transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
