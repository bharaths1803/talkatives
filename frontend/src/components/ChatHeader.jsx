import { CircleUserRound, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import GroupDialog from "./GroupDialog";

const ChatHeader = () => {
  const [groupDialogOpen, setGroupDialogOpen] = useState(false);

  const {
    selectedUser,
    setSelectedUser,
    selectedGroup,
    setSelectedGroup,
    selectedType,
  } = useChatStore();
  const navigate = useNavigate();

  const handleCloseChat = () => {
    setSelectedUser(null);
    setSelectedGroup(null);
  };

  const handleProfileClick = () => {
    if (selectedType === "users") navigate("/view-profile");
    else setGroupDialogOpen(true);
  };

  const handleCloseGroupDialog = () => {
    setGroupDialogOpen(false);
  };

  return (
    <>
      {<GroupDialog onClose={handleCloseGroupDialog} open={groupDialogOpen} />}
      <div className="w-full h-14 p-3 flex items-center justify-between space-x-4 bg-skeleton-purple text-black/80">
        <div className="flex space-x-2">
          <button>
            {selectedType === "users" ? (
              <>
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
              </>
            ) : (
              <>
                {selectedGroup.profilePicUrl ? (
                  <div className="size-10">
                    <img
                      src={selectedGroup.profilePicUrl}
                      alt="Profile Pic"
                      className="size-full rounded-full"
                    />
                  </div>
                ) : (
                  <CircleUserRound className="size-9" />
                )}
              </>
            )}
          </button>
          <button
            className="p-3 text-xl text-black hover:bg-about-purple-10 active:bg-about-purple-30 rounded-lg"
            onClick={handleProfileClick}
          >
            <p className="">
              {selectedType === "users"
                ? selectedUser?.username
                : selectedGroup?.groupname}
            </p>
          </button>
        </div>

        <div className="">
          <button
            className="hover:bg-slate-400/50 active:bg-slate-400 rounded-full p-2"
            onClick={handleCloseChat}
          >
            <X className="size-6" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
