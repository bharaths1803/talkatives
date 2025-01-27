import { Loader, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";

const ViewProfilePage = () => {
  const navigate = useNavigate();
  const { selectedUser } = useChatStore();
  const {
    authUser,

    checkAuth,
  } = useAuthStore();

  const { isBlockingOrUnblockingUser, blockOrUnblockUser } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [blockOrUnblockUser]);

  const handleNavigateToChatPage = () => {
    navigate("/");
  };

  const handleBlockUser = () => {
    const block = !authUser.blockedUsers.includes(selectedUser._id);
    blockOrUnblockUser(block);
  };

  function formatDateToMonthYear(dateString) {
    if (!dateString) return "Jan 2025";
    const date = new Date(dateString);
    const options = { month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  if (!selectedUser) {
    navigate("/");
    return;
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
              src={selectedUser.profilePicUrl || "user.png"}
              alt="User icon image"
              className="size-full rounded-full"
            />
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
            <h2 className="text-4xl font-bold">{`${selectedUser.firstName} ${selectedUser.lastName}`}</h2>
            <p className="text-base">
              Talkative since {formatDateToMonthYear(selectedUser.createdAt)}
            </p>
            <div className="space-y-3 max-w-full">
              <p className="">{`Who is ${selectedUser.firstName} ${selectedUser.lastName}?`}</p>
              <div className="relative w-96 max-w-full bg-about-purple backdrop-blur-custom shadow-custom-inset-2 rounded-full flex justify-between">
                <div className="pl-4 py-3 pr-9 flex justify-center items-center border-none bg-transparent focus:outline-none">
                  {selectedUser.description}
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <button
                className="w-40 bg-btn-primary text-white rounded-full p-2 hover:opacity-80 active:opacity-60 flex justify-center items-center"
                onClick={handleBlockUser}
              >
                {isBlockingOrUnblockingUser ? (
                  <Loader className="size-6 animate-spin pointer-events-none" />
                ) : (
                  <p>
                    {authUser.blockedUsers.includes(selectedUser._id)
                      ? "Unblock"
                      : "Block"}
                  </p>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfilePage;
