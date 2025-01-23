import { Check, Loader, SquarePen, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useProfileStore } from "../store/useProfileStore";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const navigate = useNavigate();

  const { authUser, logout, isLoggingout, checkAuth } = useAuthStore();
  const { isUpdatingDescription, updateDescription } = useProfileStore();
  const [description, setDescription] = useState("");
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const descriptionInputBoxRef = useRef(null);

  useEffect(() => {
    checkAuth();
    setDescription(authUser.description);
  }, []);

  useEffect(() => {
    if (isEditingDescription && descriptionInputBoxRef.current) {
      descriptionInputBoxRef.current.focus();
    }
  }, [isEditingDescription]);

  const handleLogout = () => {
    logout();
  };

  const handleNavigateToChatPage = () => {
    navigate("/");
  };

  const handleUpdateDescription = () => {
    if (description.trim().length > 100) {
      toast.error("Description must contain a maximum of 100 characters");
      setDescription(authUser.description);
      return;
    }
    if (description.trim() != authUser.description) {
      updateDescription(description.trim());
    }
    setDescription(description);
  };

  const handleEditDescriptionButtonClick = () => {
    if (isEditingDescription) {
      handleUpdateDescription();
    }
    setIsEditingDescription(!isEditingDescription);
  };

  function formatDateToMonthYear(dateString) {
    const date = new Date(dateString);
    const options = { month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <div className="bg-custom-gradient w-screen h-screen space-y-3 relative">
      {/* <div className="fixed pl-4 top-0 left-0 bg-red-500">Hi there</div>
       */}
      <div className="w-full flex justify-end space-x-2 p-4 pr-6">
        <button
          className="w-28 bg-btn-primary text-white rounded-full p-2 hover:opacity-80 active:opacity-60"
          onClick={handleNavigateToChatPage}
        >
          Message
        </button>
        <div>
          <img src="/chat.png" alt="chat image" className="size-10" />
        </div>
      </div>
      <div className="mx-20">
        <div className="bg-lightGrayTransparent border border-soft-white rounded-3xl shadow-custom-inset-light backdrop-blur-custom">
          <div className="w-full flex justify-end">
            <button
              className="hover:bg-slate-400/50 active:bg-slate-400 rounded-full p-2"
              onClick={handleNavigateToChatPage}
            >
              <X className="size-6" />
            </button>
          </div>
          <div className="w-full flex-col flex justify-center items-center p-3 space-y-4">
            <h2 className="text-2xl">{`${authUser.firstName} ${authUser.lastName}`}</h2>
            <p className="text-sm">
              Talkative since {formatDateToMonthYear(authUser.updatedAt)}
            </p>
            <div className="space-y-3">
              <p className="">Who am I?</p>
              <div className="w-96 max-w-full bg-about-purple backdrop-blur-custom shadow-custom-inset-2 rounded-full flex justify-between">
                {isEditingDescription ? (
                  <input
                    className="pl-3 w-full flex justify-center items-center border-none bg-transparent focus:outline-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    ref={descriptionInputBoxRef}
                  />
                ) : (
                  <div className="pl-3 flex justify-center items-center border-none bg-transparent focus:outline-none">
                    {description}
                  </div>
                )}
                <button
                  className="hover:bg-slate-400/50 active:bg-slate-400 rounded-full p-2"
                  onClick={handleEditDescriptionButtonClick}
                >
                  {isUpdatingDescription ? (
                    <Loader className="size-5" />
                  ) : isEditingDescription ? (
                    <Check className="size-5" />
                  ) : (
                    <SquarePen className="size-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <button
                className="w-40 bg-btn-primary text-white rounded-full p-2 hover:opacity-80 active:opacity-60 flex justify-center items-center"
                onClick={handleLogout}
              >
                {isLoggingout ? (
                  <Loader className="size-6 animate-spin pointer-events-none" />
                ) : (
                  <p>Logout</p>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
