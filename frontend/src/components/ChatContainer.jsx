import ChatContent from "./ChatContent";
import ChatHeader from "./ChatHeader";
import SendMessageInput from "./SendMessageInput";

const ChatContainer = () => {
  return (
    <div className="bg-yellow-600 h-full hidden md:block w-full">
      <ChatHeader />
      <ChatContent />
      <SendMessageInput />
    </div>
  );
};

export default ChatContainer;
