import { CircleUser } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useRef } from "react";
import StartConvesrationWithNewFriend from "../skeletons/StartConversationWithNewFriend.jsx";
import MessageSkeleton from "../skeletons/MessageSkeleton.jsx";

const ChatContent = () => {
  const { authUser } = useAuthStore();
  const { messages, isMessagesLoading } = useChatStore();
  const lastMessageRef = useRef();

  useEffect(() => {
    if (messages && lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages]);

  return (
    <div className="bg-chat-purple flex-1 overflow-y-auto p-3 px-5 scrollbar-none">
      {isMessagesLoading && <MessageSkeleton />}
      {!isMessagesLoading &&
        messages.length > 0 &&
        messages.map((message, idx) => {
          const prevIdx = idx - 1;
          const prevMessageSenderId =
            idx != 0 ? messages[prevIdx].senderId : "";
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
              ref={lastMessageRef}
            >
              {isSenderMessage ? (
                <>
                  <div
                    className={`${
                      message.imageUrl && !message.text
                        ? ""
                        : "bg-skeleton-purple"
                    } p-3 rounded-lg ${
                      isStartingMessageOfNewContiguousSequence
                        ? "rounded-tr-none"
                        : ""
                    } max-w-full`}
                  >
                    {message.imageUrl && (
                      <div className="w-full flex justify-end">
                        <img
                          src={message.imageUrl}
                          alt="Message image "
                          className="size-28"
                        />
                      </div>
                    )}
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
                    className={`${
                      message.imageUrl && !message.text
                        ? ""
                        : "bg-skeleton-purple"
                    } p-3 rounded-lg ${
                      isStartingMessageOfNewContiguousSequence
                        ? "rounded-tl-none"
                        : ""
                    } max-w-full`}
                  >
                    {message.imageUrl && (
                      <div className="w-full flex justify-start">
                        <img
                          src={message.imageUrl}
                          alt="Message image "
                          className="size-28"
                        />
                      </div>
                    )}
                    {message.text}
                  </div>
                </>
              )}
            </div>
          );
        })}
      {!isMessagesLoading && messages.length == 0 && (
        <StartConvesrationWithNewFriend />
      )}
    </div>
  );
};

export default ChatContent;
