import { CircleUserRound, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();

  const handleCloseChat = () => {
    setSelectedUser(null);
  };
  return (
    <div className="w-full h-14 p-3 flex items-center space-x-4 bg-skeleton-purple text-black/80">
      <button>
        {selectedUser.profilePicUrl ? (
          <div className="size-10">
            <img
              src={selectedUser.profilePicUrl}
              alt="Profile Pic"
              className="size-full rounded-full"
            />
          </div>
        ) : (
          <CircleUserRound className="size-9" />
        )}
      </button>
      <p className="text-xl text-black">{selectedUser?.username}</p>
      <div className="w-full flex justify-end">
        <button
          className="hover:bg-slate-400/50 active:bg-slate-400 rounded-full p-2"
          onClick={handleCloseChat}
        >
          <X className="size-6" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
