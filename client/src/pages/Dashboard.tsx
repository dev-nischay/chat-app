import { useState } from "react";
import { MessageCircle, Users } from "lucide-react";
import CreateRoom from "../components/CreateRoom";
import JoinRoom from "../components/JoinRoom";
import Button from "../components/Button";
export default function Dashboard() {
  const [mode, setMode] = useState<string | null>(""); // 'join' or 'create'

  if (mode === "created") {
    return <CreateRoom setMode={setMode} />;
  }

  if (mode === "join") {
    return <JoinRoom setMode={setMode} />;
  }

  return (
    <div className="h-[100vh]  flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <MessageCircle className="w-10 h-10 text-white" />
            <h1 className="text-4xl font-bold text-white">Real Time Chat</h1>
          </div>
          <p className="text-zinc-400">
            Temporary rooms that expire after both users exit
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => setMode("created")}
            className="bg-white text-black hover:bg-zinc-200"
          >
            <MessageCircle className="w-5 h-5" />
            Create New Room
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center  text-sm">
              <span className="px-4 bg-black text-zinc-500">or</span>
            </div>
          </div>

          <Button
            onClick={() => setMode("join")}
            className="bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-800 "
          >
            <Users className="w-5 h-5" />
            Join Existing Room
          </Button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-zinc-600 text-sm">Secure • Private • Temporary</p>
        </div>
      </div>
    </div>
  );
}
