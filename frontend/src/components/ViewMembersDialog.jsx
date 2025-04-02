import { CircleUserRound, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const ViewMembersDialog = ({ open, onClose }) => {
  const { selectedGroup } = useChatStore();

  return (
    <>
      {open && (
        <>
          <div className="fixed top-0 left-0 w-screen h-screen opacity-50 backdrop-blur-sm z-30" />
          <div className="fixed top-0 left-0 w-screen h-screen flex flex-col py-20 items-center space-y-4 z-50">
            <div className="bg-lightGrayTransparent shadow-custom-inset-light backdrop-blur-custom border border-soft-white rounded-3xl h-[70vh] mx-2 w-96 max-w-[98vw]">
              <div className="w-full flex justify-between">
                <h2 className="w-full text-center mt-2 text-xl">Members</h2>
                <button
                  className="hover:bg-slate-400/50 active:bg-slate-400 rounded-full p-2"
                  onClick={onClose}
                >
                  <X className="size-6" />
                </button>
              </div>
              <div className="w-[97%] h-[70%] overflow-y-auto scrollbar-none space-y-2 mt-2">
                {selectedGroup.members.length > 0 &&
                  selectedGroup.members.map((user) => (
                    <button
                      key={user._id}
                      className={`w-full flex items-center h-14 pl-0 py-6 text-black/50 hover:bg-royal-purple mx-2 active:bg-blue-400 space-x-3`}
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
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ViewMembersDialog;
