import { MessageCircle } from "lucide-react";
import { useRoomStore } from "../context/roomStore";

export type ServerResponse = {
  type: "error" | "response";
  payload: {
    message: string;
  };
};

type ChatMessages = {
  sender: "me" | "server";
  message: string;
};
import { useEffect, useState, useRef } from "react";
import type { UserResponse } from "../components/JoinRoom";
export const ChatPage = () => {
  let inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const roomId = useRoomStore((state) => state?.roomId);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [chats, setChats] = useState<ChatMessages[]>([]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  useEffect(() => {
    try {
      const ws = new WebSocket("ws://localhost:8080");
      setSocket(ws);

      const join: UserResponse = {
        type: "join",
        payload: {
          roomId: roomId,
        },
      };

      setTimeout(() => {
        ws.send(JSON.stringify(join));
      }, 2000);

      ws.onmessage = (response) => {
        if (typeof response.data === "string") {
          const data: ServerResponse = JSON.parse(response.data);
          console.log(response);

          setChats((prev) => [
            ...prev,
            { sender: "server", message: data.payload.message },
          ]);

          if (data.type === "error") {
            throw new Error(data.payload.message);
          }
        }
      };
      return () => {
        ws.close(1000, "User logged out");
        setSocket(null);
      };
    } catch (error: unknown) {
      error instanceof Error ? alert(error.message) : console.log(error);
    }
  }, []);

  const sendMessage = () => {
    let inputMessage = inputRef.current?.value as string;

    if (inputMessage?.length > 0) {
      const body = {
        type: "chat",
        payload: {
          message: inputMessage,
        },
      };

      setChats((prev) => [...prev, { sender: "me", message: inputMessage }]);

      socket?.send(JSON.stringify(body));
      if (inputRef.current?.value != null) {
        inputRef.current.value = "";
      }
    } else {
      alert("Message cannot be empty");
    }
  };

  return (
    <>
      <div>
        <div className="border-white/10 border-2  rounded-lg mx-auto max-w-xl h-[45rem] flex flex-col gap-2 p-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <MessageCircle color="white" size={20} />
            <div className="text-white text-xl font-medium ">
              Real Time Chat
            </div>
          </div>

          <div className="text-white/60  font-thin  text-[13px]">
            temporary room that expires after both users exit
          </div>

          {/* Room details */}
          <div className="bg-white/10 rounded-md p-2 flex justify-between items-center my-5 border-white/10 border px-2">
            <div className="text-white/60 text-[12px] font-thin">
              Room Code :
            </div>
            <div className="text-white/60 text-[12px]">Users : 1/2</div>
          </div>

          {/* Chat box */}
          {/* enable visible scroll on message */}
          <div className="border-white/10 overflow-y-scroll  h-[30rem] rounded-xl  border-2 p-3">
            <div className="flex flex-col  gap-4">
              {chats.map((e, index) => (
                <div
                  key={index}
                  className={`min-h-0 p-2 w-fit rounded-md text-sm   ${
                    e.sender === "server"
                      ? "bg-white/50 self-start"
                      : "bg-white self-end"
                  }`}
                >
                  {e.message}
                </div>
              ))}
              <div ref={bottomRef}></div>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <input
              type="text"
              className=" p-3 px-3 border-white/10  border rounded-md flex-1 bg-transparent placeholder:text-[10px]   text-white text-sm  outline-none  "
              placeholder="Type a message ..."
              ref={inputRef}
            />
            <button
              onClick={sendMessage}
              className="bg-white h-10 w-20 rounded-md text-sm "
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
