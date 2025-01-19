import { CircleUserRound } from "lucide-react";

const ChatHeader = () => {
  return (
    <div className="w-full h-14 p-3 flex items-center space-x-4 bg-skeleton-purple text-black/80">
      <button>
        <CircleUserRound className="size-9" />
      </button>
      <p className="text-xl text-black">Person 1</p>
    </div>
  );
};

export default ChatHeader;
