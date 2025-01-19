import { useEffect } from "react";
import NoChatSelected from "../skeletons/NoChatSelected";
import { useChatStore } from "../store/useChatStore";
import ChatContent from "./ChatContent";
import ChatHeader from "./ChatHeader";
import SendMessageInput from "./SendMessageInput";

const ChatContainer = () => {
  const { selectedUser, subscribeToMessages, unsubscribeFromMessages } =
    useChatStore();

  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [subscribeToMessages, unsubscribeFromMessages, selectedUser]);

  if (!selectedUser) {
    return <NoChatSelected />;
  }
  return (
    <div
      className={`h-screen flex flex-col ${
        selectedUser ? "w-full" : "w-0"
      } md:w-full transition-all`}
    >
      <ChatHeader />
      <ChatContent />
      <SendMessageInput />
    </div>
  );
};

export default ChatContainer;
