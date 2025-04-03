import { Loader, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import EditGroupDescriptionDialog from "./EditGroupDescriptionDialog";
import ViewMembersDialog from "./ViewMembersDialog";
import AddMembersDialog from "./AddMembersDialog";
import { useAuthStore } from "../store/useAuthStore";

const GroupDialog = ({ open, onClose }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editDescriptionDialogOpen, setEditDescriptionDialogOpen] =
    useState(false);

  const [viewMembersDialogOpen, setViewMembersDialogOpen] = useState(false);
  const [addMembersDialogOpen, setAddMembersDialogOpen] = useState(false);

  const imageUploadInputBoxRef = useRef(null);
  const {
    selectedGroup,
    updateGroupPhoto,
    isUpdatingGroupPhoto,
    isExitingGroup,
    exitGroup,
  } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (selectedGroup) {
      const selectedGroupAdmins = selectedGroup.admins.map(
        (admin) => admin._id
      );
      if (selectedGroupAdmins.includes(authUser._id)) setIsAdmin(true);
    }
  }, []);

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

  function formatDateToMonthYear(dateString) {
    if (!dateString) return "Jan 2025";
    const date = new Date(dateString);
    const options = { month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const handleOpenViewMembersDialog = () => {
    setViewMembersDialogOpen(true);
  };

  const handleCloseViewMembersDialog = () => {
    setViewMembersDialogOpen(false);
  };

  const handleOpenAddMembersDialog = () => {
    setAddMembersDialogOpen(true);
  };

  const handleCloseAddMembersDialog = () => {
    setAddMembersDialogOpen(false);
  };

  const handleUpdatePhoto = () => {
    if (!profilePic) return;
    updateGroupPhoto(profilePic);
  };

  const handleExitGroup = () => {
    exitGroup();
    onClose();
  };

  return (
    <>
      {open && (
        <>
          {editDescriptionDialogOpen && (
            <EditGroupDescriptionDialog
              open={editDescriptionDialogOpen}
              onClose={handleCloseEditDescriptionDialog}
            />
          )}
          {viewMembersDialogOpen && (
            <ViewMembersDialog
              open={viewMembersDialogOpen}
              onClose={handleCloseViewMembersDialog}
            />
          )}
          {addMembersDialogOpen && (
            <AddMembersDialog
              open={addMembersDialogOpen}
              onClose={handleCloseAddMembersDialog}
            />
          )}
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
              <div className="w-full flex justify-center items-center gap-2">
                <button
                  className="rounded-full size-20 hover:opacity-50"
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
                {isAdmin && (
                  <button
                    className="text-sm bg-btn-primary h-12 px-2 rounded-lg text-white hover:opacity-80 active:opacity-60 flex justify-center items-center"
                    onClick={handleUpdatePhoto}
                  >
                    {isUpdatingGroupPhoto ? (
                      <Loader className="size-5 animate-spin" />
                    ) : (
                      "Update Photo"
                    )}
                  </button>
                )}
              </div>
              <h2 className="w-full text-center text-2xl">
                {selectedGroup.groupname}
              </h2>
              <h3 className="w-full text-center">
                Group {selectedGroup.members.length} member
                {`${selectedGroup.members.length > 1 ? "s" : ""}`}
              </h3>
              <button
                className="mt-2 flex bg-royal-purple rounded-lg pl-3 py-2 mx-2 w-[95%]"
                onClick={handleOpenEditDescriptionDialog}
              >
                <span className="">
                  {selectedGroup.description || "Edit group description"}
                </span>
              </button>
              <h3 className="text-center">
                Created by {selectedGroup.createdBy.username},{" "}
                {formatDateToMonthYear(
                  selectedGroup.createdAt || selectedGroup.updatedAt
                )}
              </h3>
              {isAdmin && (
                <div className="w-full flex justify-center items-center px-3">
                  <button
                    className="text-sm bg-btn-primary text-white rounded-full px-3 py-2 hover:opacity-80 active:opacity-60 flex justify-center items-center"
                    onClick={handleOpenAddMembersDialog}
                  >
                    Add Members
                  </button>
                </div>
              )}
              <div className="w-full flex justify-center items-center px-3">
                <button
                  className="text-sm bg-btn-primary text-white rounded-full px-3 py-2 hover:opacity-80 active:opacity-60 flex justify-center items-center mx-2"
                  onClick={handleOpenViewMembersDialog}
                >
                  View Members
                </button>
              </div>

              <div className="w-full flex justify-center items-center">
                <button
                  className="text-sm bg-red-700 text-white rounded-full px-3 py-2 hover:opacity-80 active:opacity-60 flex justify-center items-center"
                  onClick={handleExitGroup}
                >
                  Exit Group
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default GroupDialog;
