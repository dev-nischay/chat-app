import { MessageCircle } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export const ChatPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState<WebSocket>();
  const [incmomingMessage, setIncomingMessage] = useState<string[]>([]);
  const [chats, setChats] = useState([{}]);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    ws.onmessage = (message) => {
      const data = message.data.toString();
      setIncomingMessage((prev) => [...prev, data]);

      setChats((prev) => [
        ...prev,
        {
          type: message.data.type,
          message: data,
        },
      ]);
    };
  }, []);

  const sendMessage = () => {
    const inputMessage = inputRef.current?.value;

    const body = {
      type: "chat",
      payload: {
        message: inputMessage,
      },
    };

    socket?.send(JSON.stringify(body));
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
          <div className="border-white/10 h-[30rem] rounded-xl  border-2 p-3">
            <div className="   flex flex-col gap-4">
              {incmomingMessage.map((e, index) => (
                <div
                  key={index}
                  className="bg-white/50 h-fit p-2 w-fit rounded-md text-sm   "
                >
                  {e}
                </div>
              ))}
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
