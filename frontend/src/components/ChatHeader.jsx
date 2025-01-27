import { CircleUserRound, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useNavigate } from "react-router-dom";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const navigate = useNavigate();

  const handleCloseChat = () => {
    setSelectedUser(null);
  };

  const handleUserProfileClick = () => {
    navigate("/view-profile");
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
      <button
        className="p-3 text-xl text-black hover:bg-about-purple-10 active:bg-about-purple-30 rounded-lg"
        onClick={handleUserProfileClick}
      >
        {selectedUser?.username}
      </button>
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
