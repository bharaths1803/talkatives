import { Check, ImageUp, Loader, SquarePen, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useProfileStore } from "../store/useProfileStore";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const navigate = useNavigate();

  const { authUser, checkAuth } = useAuthStore();
  const { isUpdatingProfile, updateProfile } = useProfileStore();
  const [description, setDescription] = useState("");
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const descriptionInputBoxRef = useRef(null);
  const imageUploadInputBoxRef = useRef(null);

  useEffect(() => {
    checkAuth();
    if (authUser.description) {
      setDescription((desc) => (desc = authUser.description));
    }
  }, []);

  useEffect(() => {
    if (isEditingDescription && descriptionInputBoxRef.current) {
      descriptionInputBoxRef.current.focus();
    }
  }, [isEditingDescription]);

  const handleUpdateProfile = () => {
    updateProfile({
      description,
      profilePic,
    });
  };

  const handleNavigateToChatPage = () => {
    navigate("/");
  };

  const handleUpdateDescription = () => {
    if (description.trim().length > 100) {
      toast.error("Description must contain a maximum of 100 characters");
      return;
    }
    setDescription(description.trim());
  };

  const handleEditDescriptionButtonClick = () => {
    if (isEditingDescription) {
      handleUpdateDescription();
    }
    setIsEditingDescription(!isEditingDescription);
  };

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

  function formatDateToMonthYear(dateString) {
    const date = new Date(dateString);
    const options = { month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <div className="bg-custom-gradient w-screen h-screen space-y-3 relative">
      <div className="w-full flex justify-end space-x-2 p-4 pr-6 mb-10">
        <button
          className="w-24 md:w-28 bg-btn-primary text-white rounded-full p-2 hover:opacity-80 active:opacity-60"
          onClick={handleNavigateToChatPage}
        >
          Message
        </button>
        <div className="hidden md:block">
          <img src={"/chat.png"} alt="chat image" className="size-10" />
        </div>
      </div>
      <div className="mx-4 sm:mx-8  md:mx-20">
        <div className="bg-lightGrayTransparent border border-soft-white rounded-3xl shadow-custom-inset-light backdrop-blur-custom relative">
          <div className="absolute md:-top-28 left-1/2 -translate-y-1/2 md:translate-y-0 -translate-x-1/2 rounded-full w-40 sm:w-52 md:w-60 h-40 sm:h-52 md:h-60">
            <img
              src={profilePic || authUser.profilePicUrl || "user.png"}
              alt="User icon image"
              className="size-full rounded-full"
            />
            <input
              type="file"
              className="hidden"
              ref={imageUploadInputBoxRef}
              onChange={loadImage}
            />
            <button
              className="absolute bottom-0 right-0 md:right-6 text-blue-800 hover:bg-slate-400/50 active:bg-slate-400 rounded-full p-1"
              onClick={handleImageUpload}
            >
              <ImageUp className="size-10" />
            </button>
          </div>
          <div className="w-full flex justify-end">
            <button
              className="hover:bg-slate-400/50 active:bg-slate-400 rounded-full p-2"
              onClick={handleNavigateToChatPage}
            >
              <X className="size-6" />
            </button>
          </div>
          <div className="w-full flex-col flex justify-center items-center p-3 space-y-4 mt-10 md:mt-20 lg:mt-24">
            <h2 className="text-4xl font-bold">{`${authUser.firstName} ${authUser.lastName}`}</h2>
            <p className="text-base">
              Talkative since {formatDateToMonthYear(authUser.updatedAt)}
            </p>
            <div className="space-y-3 max-w-full">
              <p className="">Who am I?</p>
              <div className="relative w-96 max-w-full bg-about-purple backdrop-blur-custom shadow-custom-inset-2 rounded-full flex justify-between">
                {isEditingDescription ? (
                  <input
                    className="py-2 pl-3 pr-10 w-full flex justify-center items-center border-none bg-transparent focus:outline-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    ref={descriptionInputBoxRef}
                  />
                ) : (
                  <div className="pl-4 py-3 pr-9 flex justify-center items-center border-none bg-transparent focus:outline-none">
                    {description || authUser.description}
                  </div>
                )}
                <button
                  className="hover:bg-slate-400/50 active:bg-slate-400 rounded-full p-2 absolute top-0 right-0"
                  onClick={handleEditDescriptionButtonClick}
                >
                  {isEditingDescription ? (
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
                onClick={handleUpdateProfile}
              >
                {isUpdatingProfile ? (
                  <Loader className="size-6 animate-spin pointer-events-none" />
                ) : (
                  <p>Update Profile</p>
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
