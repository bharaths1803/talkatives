import { X } from "lucide-react";
import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import EditGroupDescriptionDialog from "./EditGroupDescriptionDialog";

const GroupDialog = ({ open, onClose }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [editDescriptionDialogOpen, setEditDescriptionDialogOpen] =
    useState(false);

  const imageUploadInputBoxRef = useRef(null);
  const { selectedGroup } = useChatStore();

  const handleImageUpload = () => {
    if (imageUploadInputBoxRef) {
      imageUploadInputBoxRef.current.click();
    }
  };

  const loadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64Image = reader.result;
      console.log(base64Image);
      if (!base64Image.startsWith("data:image/")) {
        toast.error("Upload an image only");
        return;
      }
      setProfilePic(base64Image);
    };
  };

  const handleOpenEditDescriptionDialog = () => {
    setEditDescriptionDialogOpen(true);
  };

  const handleCloseEditDescriptionDialog = () => {
    setEditDescriptionDialogOpen(false);
  };

  return (
    <>
      {open && (
        <>
          <EditGroupDescriptionDialog
            open={editDescriptionDialogOpen}
            onClose={handleCloseEditDescriptionDialog}
          />
          <div className="fixed top-0 left-0 w-screen h-screen opacity-50 backdrop-blur-sm z-20" />
          <div className="fixed top-0 left-0 w-screen h-screen flex flex-col py-20 items-center space-y-4 z-30">
            <div className="bg-lightGrayTransparent shadow-custom-inset-light backdrop-blur-custom border border-soft-white rounded-3xl h-[70vh] mx-2 w-96 max-w-[98vw] space-y-3">
              <div className="w-full flex justify-end">
                <button
                  className="hover:bg-slate-400/50 active:bg-slate-400 rounded-full p-2"
                  onClick={onClose}
                >
                  <X className="size-6" />
                </button>
              </div>
              <div className="w-full flex justify-center">
                <button
                  className="rounded-full size-20"
                  onClick={handleImageUpload}
                >
                  <img
                    src={
                      profilePic || selectedGroup.profilePicUrl || "user.png"
                    }
                    alt="User icon image"
                    className="size-full rounded-full"
                  />
                  <input
                    type="file"
                    className="hidden"
                    ref={imageUploadInputBoxRef}
                    onChange={loadImage}
                  />
                </button>
              </div>
              <h2 className="w-full text-center text-2xl">
                {selectedGroup.groupname}
              </h2>
              <h3 className="w-full text-center">
                Group {selectedGroup.members.length} members
              </h3>
              <button
                className="mt-2 flex bg-royal-purple rounded-lg h-10 pl-3 py-2 mx-2 w-[95%]"
                onClick={handleOpenEditDescriptionDialog}
              >
                <span className="">
                  {selectedGroup.description || "Edit group description"}
                </span>
              </button>
              {/* <div className="w-full h-[70%] overflow-y-auto scrollbar-none space-y-2 mt-2">
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
              </div> */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default GroupDialog;
