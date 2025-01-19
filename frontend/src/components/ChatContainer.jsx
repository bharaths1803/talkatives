import { useChatStore } from "../store/useChatStore";
import ChatContent from "./ChatContent";
import ChatHeader from "./ChatHeader";
import SendMessageInput from "./SendMessageInput";

const ChatContainer = () => {
  const { selectedUser } = useChatStore();
  return (
    <div
      className={`bg-yellow-600 h-full ${
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
