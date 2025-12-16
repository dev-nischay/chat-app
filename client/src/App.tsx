import "./App.css";
import { MessageCircle } from "lucide-react";
function App() {
  return (
    <>
      <div className="bg-black min-h-screen w-full p-16 font-mono">
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
          <div className="border-white/10 h-[30rem] rounded-xl  border-2"></div>

          <div className="flex gap-2 items-center">
            <input
              type="text"
              className=" p-2 px-3 border-white/10  border rounded-md flex-1 bg-transparent placeholder:text-[10px]  text-white text-sm  outline-none  "
              placeholder="Type a message ..."
            />
            <button className="bg-white h-9 w-20 rounded-md text-sm">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
