import { CircleUserRound } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="w-full h-14 p-3 flex items-center space-x-4 bg-skeleton-purple text-black/80">
      <button>
        <CircleUserRound className="size-9" />
      </button>
      <p className="text-xl text-black">{selectedUser?.username}</p>
    </div>
  );
};

export default ChatHeader;
