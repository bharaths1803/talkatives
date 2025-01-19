import { Hand } from "lucide-react";
import React from "react";
import { useChatStore } from "../store/useChatStore";

const StartConvesrationWithNewFriend = () => {
  const { sendMessage } = useChatStore();
  const handleStartConversation = () => {
    sendMessage({
      text: "Hi👋🏻",
    });
  };
  return (
    <div className="bg-chat-purple h-5/6 overflow-y-auto p-3 px-5 flex justify-center items-center ">
      <button
        className="flex flex-col items-center p-2 rounded-xl rounded-tl-none animate-ping"
        onClick={handleStartConversation}
      >
        <div className="size-10 bg-custom-gray flex justify-center items-center rounded-xl text-red-300 group-hover:opacity-70">
          <Hand className="rotate-45" />
        </div>
        <h2 className="text-sm ">Say Hi to your new friend...</h2>
      </button>
    </div>
  );
};

export default StartConvesrationWithNewFriend;

const Temp = () => {
  return (
    <div className="flex flex-col items-center space-y-6 bg-skeleton-purple p-10 rounded-xl rounded-tl-none">
      <div className="size-16 bg-custom-gray flex justify-center items-center rounded-xl text-red-300 group-hover:opacity-70 animate-bounce">
        <MessageCircle className="size-10" />
      </div>
      <h1 className="text-2xl text-black/80 font-semibold">
        Welcome back to Talkatives!!!
      </h1>
      <h2 className="text-black/80 font-medium">
        Select your buddy and start your conversation today...
      </h2>
    </div>
  );
};
