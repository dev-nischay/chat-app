import { MessageCircle, Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export type RoomProps = {
  setMode: React.Dispatch<React.SetStateAction<string | null>>;
};

export const CreateRoom = ({ setMode }: RoomProps) => {
  const [copied, setCopied] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  const generateRoomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEnterRoom = () => {
    console.log("Entering room:", generatedCode);
    alert(`Entering room: ${generatedCode}`);
  };

  useEffect(() => {
    const newCode = generateRoomCode();
    setGeneratedCode(newCode);

    return () => {
      setGeneratedCode("");
    };
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* add start logic to main layout */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-zinc-900 rounded-lg p-8 border border-zinc-800">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle className="w-8 h-8 text-white" />
            <h1 className="text-2xl font-bold text-white">Room Created!</h1>
          </div>

          <p className="text-zinc-400 mb-6">
            Share this code with others to let them join your chat room
          </p>

          <div className="bg-zinc-950 rounded-lg p-6 mb-6 border border-zinc-800">
            <p className="text-zinc-500 text-sm mb-2">Room Code</p>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-mono font-bold text-white tracking-wider">
                {generatedCode}
              </span>
              <button
                onClick={handleCopyCode}
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5 text-zinc-400" />
                )}
              </button>
            </div>
          </div>

          <button
            onClick={handleEnterRoom}
            className="w-full bg-white text-black font-semibold py-3 px-4 rounded-lg hover:bg-zinc-200 transition-colors mb-3"
          >
            Enter Room
          </button>

          <button
            onClick={() => {
              setMode(null);
              setGeneratedCode("");
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

export default CreateRoom;
