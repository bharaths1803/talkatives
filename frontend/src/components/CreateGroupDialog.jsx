import { CircleUserRound, Loader, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";

const CreateGroupDialog = ({ open, onClose }) => {
  const { users, getUsers, isUsersLoading, isCreatingGroup, createGroup } =
    useChatStore();
  const [groupname, setGroupname] = useState("");
  const [members, setMembers] = useState([]);
  const handleCreateGroup = () => {
    if (!groupname || !members) {
      toast.error("Enter group name and select members");
      return;
    }
    if (members.length == 0) {
      toast.error("Select at least 1 member for your group");
      return;
    }
    const groupData = {
      groupname,
      members,
    };
    createGroup(groupData);
    onClose();
  };

  const toggleMemberSelection = (userId) => {
    if (members.includes(userId)) {
      setMembers(members.filter((memberId) => memberId !== userId));
    } else {
      setMembers([...members, userId]);
    }
  };

  const handleCloseCreateGroupDialog = () => {
    setMembers([]);
    setGroupname("");
    onClose();
  };

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <>
      {open && (
        <>
          <div className="fixed top-0 left-0 w-screen h-screen opacity-50 backdrop-blur-sm z-30" />
          <div className="fixed top-0 left-0 w-screen h-screen flex flex-col py-20 items-center space-y-4 z-50">
            <div className="bg-lightGrayTransparent shadow-custom-inset-light backdrop-blur-custom border border-soft-white rounded-3xl h-[70vh] mx-2 w-96 max-w-[98vw]">
              <div className="w-full flex justify-between">
                <h2 className="w-full text-center mt-2 text-xl">
                  Create Group
                </h2>
                <button
                  className="hover:bg-slate-400/50 active:bg-slate-400 rounded-full p-2"
                  onClick={handleCloseCreateGroupDialog}
                >
                  <X className="size-6" />
                </button>
              </div>
              <div className="mt-2 flex bg-royal-purple rounded-3xl h-10 pl-3 mx-2">
                <input
                  type="text"
                  className="w-full bg-transparent border-none focus:outline-none pl-2 placeholder:text-black"
                  placeholder="Enter group name"
                  value={groupname}
                  onChange={(e) => setGroupname(e.target.value)}
                />
              </div>
              <div className="w-full h-[70%] overflow-y-auto scrollbar-none space-y-2 mt-2">
                {!isUsersLoading &&
                  users.length > 0 &&
                  users.map((user) => (
                    <button
                      key={user._id}
                      className={`w-full flex items-center h-14 pl-0 py-6 text-black/50 hover:bg-royal-purple mx-2 rounded-lg active:bg-blue-400 space-x-3 ${
                        members.includes(user._id) ? "bg-skeleton-purple" : ""
                      }`}
                      onClick={() => toggleMemberSelection(user._id)}
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
                  ))}
              </div>
              <div className="w-full flex justify-center mt-2">
                <button
                  className="w-40 bg-btn-primary text-white rounded-full p-2 hover:opacity-80 active:opacity-60 flex justify-center items-center"
                  onClick={handleCreateGroup}
                >
                  {isCreatingGroup ? (
                    <Loader className="size-6 animate-spin pointer-events-none" />
                  ) : (
                    <p>Create Group</p>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreateGroupDialog;
