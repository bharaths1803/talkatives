import { MessageCircle } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="hidden md:w-full bg-chat-purple md:flex justify-center items-center p-4 transition-all">
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
    </div>
  );
};

export default NoChatSelected;
