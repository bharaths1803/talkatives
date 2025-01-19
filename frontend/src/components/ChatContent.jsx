import { CircleUser } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatContent = () => {
  const { authUser } = useAuthStore();
  const { messages } = useChatStore();

  return (
    <div className="bg-chat-purple h-5/6 overflow-y-auto p-3 px-5">
      {messages.map((message, idx) => {
        const prevIdx = idx - 1;
        const prevMessageSenderId = idx != 0 ? messages[prevIdx].senderId : "";
        const isSenderMessage = authUser._id === message.senderId;
        const isStartingMessageOfNewContiguousSequence =
          idx == 0 || prevMessageSenderId !== message.senderId;
        return (
          <div
            key={message._id}
            className={`w-full flex ${
              isSenderMessage ? "justify-end" : "justify-start "
            } ${
              prevMessageSenderId === message.senderId
                ? isSenderMessage
                  ? "pr-11"
                  : "pl-11"
                : ""
            } space-x-2 p-2`}
          >
            {isSenderMessage ? (
              <>
                <div
                  className={`bg-skeleton-purple p-3 rounded-lg ${
                    isStartingMessageOfNewContiguousSequence
                      ? "rounded-tr-none"
                      : ""
                  } max-w-full`}
                >
                  {message.text}
                </div>
                {isStartingMessageOfNewContiguousSequence && (
                  <div className="size-7">
                    <CircleUser className="object-cover" />
                  </div>
                )}
              </>
            ) : (
              <>
                {isStartingMessageOfNewContiguousSequence && (
                  <div className="size-7">
                    <CircleUser className="object-cover" />
                  </div>
                )}
                <div
                  className={`bg-skeleton-purple p-3 rounded-lg ${
                    isStartingMessageOfNewContiguousSequence
                      ? "rounded-tl-none"
                      : ""
                  } max-w-full`}
                >
                  {message.text}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChatContent;
