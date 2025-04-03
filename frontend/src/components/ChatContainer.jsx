import { useEffect } from "react";
import NoChatSelected from "../skeletons/NoChatSelected";
import { useChatStore } from "../store/useChatStore";
import ChatContent from "./ChatContent";
import ChatHeader from "./ChatHeader";
import SendMessageInput from "./SendMessageInput";

const ChatContainer = () => {
  const {
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    selectedGroup,
  } = useChatStore();

  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [
    subscribeToMessages,
    unsubscribeFromMessages,
    selectedUser,
    selectedGroup,
  ]);

  if (!selectedUser && !selectedGroup) {
    return <NoChatSelected />;
  }
  return (
    <div
      className={`h-screen flex flex-col ${
        selectedUser || selectedGroup ? "w-full" : "w-0"
      } md:w-full transition-all`}
    >
      <ChatHeader />
      <ChatContent />
      <SendMessageInput />
    </div>
  );
};

export default ChatContainer;
