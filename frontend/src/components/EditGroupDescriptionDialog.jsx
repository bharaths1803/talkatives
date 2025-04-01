import React, { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Loader } from "lucide-react";

const EditGroupDescriptionDialog = ({ open, onClose }) => {
  const { selectedGroup, updateGroupDescription, isUpdatingGroupDescription } =
    useChatStore();
  const [description, setDescription] = useState("");

  const handleUpdateGroupDescription = () => {
    updateGroupDescription(description);
  };

  return (
    <>
      {open && (
        <>
          <div className="fixed top-0 left-0 w-screen h-screen opacity-50 backdrop-blur-sm z-30" />
          <div className="fixed top-0 left-0 w-screen h-screen flex flex-col py-20 items-center space-y-4 z-50">
            <div className="bg-lightGrayTransparent shadow-custom-inset-light backdrop-blur-custom border border-soft-white rounded-3xl h-[70vh] mx-2 w-96 max-w-[98vw] flex flex-col justify-between">
              <textarea
                type="text"
                className="mt-2 flex bg-royal-purple rounded-3xl pl-3 mx-2 py-3 h-[85%] overflow-y-auto text-black placeholder:text-black scrollbar-none"
                placeholder={selectedGroup.description}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={100}
              />
              <div className="w-full grid grid-cols-2 gap-1">
                <button
                  className="hover:bg-slate-400/50 active:bg-slate-400 rounded-full p-2"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="hover:bg-slate-400/50 active:bg-slate-400 rounded-full p-2 flex justify-center items-center"
                  onClick={handleUpdateGroupDescription}
                >
                  {isUpdatingGroupDescription ? (
                    <Loader className="size-5 animate-spin" />
                  ) : (
                    "Ok"
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

export default EditGroupDescriptionDialog;
