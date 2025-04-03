import { CircleUserRound, Loader, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";

const AddMembersDialog = ({ open, onClose }) => {
  const { users, selectedGroup, isAddingMembers, addMembers } = useChatStore();
  const [members, setMembers] = useState([]);
  const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);

  const toggleMemberSelection = (userId) => {
    if (members.includes(userId)) {
      setMembers(members.filter((memberId) => memberId !== userId));
    } else {
      setMembers([...members, userId]);
    }
  };
  const handleAddMembers = () => {
    if (members.length < 1) {
      toast.error("Select at least 1 member to add");
      return;
    }
    addMembers(members);
    setMembers([]);
    onClose();
  };

  useEffect(() => {
    if (selectedGroup) {
      const groupmembers = selectedGroup.members.map((member) => member._id);
      setSelectedGroupMembers(groupmembers);
    }
    return () => setMembers([]);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen opacity-50 backdrop-blur-sm z-30" />
      <div className="fixed top-0 left-0 w-screen h-screen flex flex-col py-20 items-center space-y-4 z-50">
        <div className="bg-lightGrayTransparent shadow-custom-inset-light backdrop-blur-custom border border-soft-white rounded-3xl h-[70vh] mx-2 w-96 max-w-[98vw]">
          <div className="w-full flex justify-between">
            <h2 className="w-full text-center mt-2 text-xl">Add Members</h2>
            <button
              className="hover:bg-slate-400/50 active:bg-slate-400 rounded-full p-2"
              onClick={onClose}
            >
              <X className="size-6" />
            </button>
          </div>
          <div className="w-full h-[70%] overflow-y-auto scrollbar-none space-y-2 mt-2">
            {users.length > 0 &&
              users.map((user) => {
                const isAlreadyMember = selectedGroupMembers.includes(user._id);
                if (!isAlreadyMember)
                  return (
                    <button
                      key={user._id}
                      className={`w-[96%] flex items-center h-14 pl-0 py-6 text-black/50 hover:bg-royal-purple mx-2 rounded-lg active:bg-blue-400 space-x-3 ${
                        members.includes(user._id) ? "bg-skeleton-purple" : ""
                      }`}
                      onClick={() => toggleMemberSelection(user._id)}
                      disabled={isAlreadyMember}
                    >
                      {user.profilePicUrl ? (
                        <div className="size-10 ml-2">
                          <img
                            src={user.profilePicUrl}
                            alt="User profile pic"
                            className="size-full rounded-full"
                          />
                        </div>
                      ) : (
                        <div className="size-12 pl-2">
                          <CircleUserRound className="size-full" />
                        </div>
                      )}
                      <p className="text-black">{user.username}</p>
                    </button>
                  );
                else return <></>;
              })}
          </div>
          <div className="w-full flex justify-center mt-2">
            <button
              className="w-40 bg-btn-primary text-white rounded-full p-2 hover:opacity-80 active:opacity-60 flex justify-center items-center"
              onClick={handleAddMembers}
            >
              {isAddingMembers ? (
                <Loader className="size-6 animate-spin pointer-events-none" />
              ) : (
                <p>Add Members</p>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMembersDialog;
