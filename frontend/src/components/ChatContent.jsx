import { CircleUser } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useRef, useState } from "react";
import StartConvesrationWithNewFriend from "../skeletons/StartConversationWithNewFriend.jsx";
import MessageSkeleton from "../skeletons/MessageSkeleton.jsx";

const ChatContent = () => {
  const { authUser } = useAuthStore();
  const {
    messages,
    isMessagesLoading,
    isTyping,
    subscribeToTypingEvents,
    unsubscribeFromTypingEvents,
    selectedType,
  } = useChatStore();
  const lastMessageRef = useRef();

  useEffect(() => {
    if (messages && lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (selectedType === "users") {
      subscribeToTypingEvents();
      return () => unsubscribeFromTypingEvents();
    }
  }, []);

  return (
    <div className="bg-chat-purple flex-1 overflow-y-auto p-3 px-5 scrollbar-none">
      {isMessagesLoading && <MessageSkeleton />}
      {!isMessagesLoading &&
        messages.length > 0 &&
        messages.map((message, idx) => {
          const isGroupMessage = selectedType === "groups";
          const prevIdx = idx - 1;
          let prevMessageSenderId,
            isSenderMessage,
            isStartingMessageOfNewContiguousSequence;
          if (!isGroupMessage) {
            prevMessageSenderId = idx != 0 ? messages[prevIdx].senderId : "";
            isSenderMessage = authUser._id === message.senderId;
            isStartingMessageOfNewContiguousSequence =
              idx == 0 || prevMessageSenderId !== message.senderId;
          } else {
            prevMessageSenderId =
              idx != 0 ? messages[prevIdx].senderId._id : "";
            isSenderMessage = authUser._id === message.senderId._id;
            isStartingMessageOfNewContiguousSequence =
              idx == 0 || prevMessageSenderId !== message.senderId._id;
          }
          return (
            <div
              key={message._id}
              className={`w-full flex ${
                isSenderMessage ? "justify-end" : "justify-start "
              } ${
                isGroupMessage
                  ? prevMessageSenderId === message.senderId._id
                    ? isSenderMessage
                      ? "pr-11"
                      : "pl-11"
                    : ""
                  : prevMessageSenderId === message.senderId
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
                    <div>
                      <p className="max-w-fit break-all"> {message.text}</p>
                    </div>
                  </div>
                  {!isGroupMessage &&
                    isStartingMessageOfNewContiguousSequence && (
                      <div className="size-7">
                        <CircleUser className="object-cover" />
                      </div>
                    )}
                  {isGroupMessage &&
                    isStartingMessageOfNewContiguousSequence && (
                      <img
                        src={message.senderId.profilePicUrl || "user.png"}
                        alt="User icon image"
                        className="size-7 rounded-full"
                      />
                    )}
                </>
              ) : (
                <>
                  {!isGroupMessage &&
                    isStartingMessageOfNewContiguousSequence && (
                      <div className="size-7">
                        <CircleUser className="object-cover" />
                      </div>
                    )}
                  {isGroupMessage &&
                    isStartingMessageOfNewContiguousSequence && (
                      <img
                        src={message.senderId.profilePicUrl || "user.png"}
                        alt="User icon image"
                        className="size-7 rounded-full"
                      />
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
                    <div className="space-y-2">
                      {isGroupMessage && (
                        <p className="max-w-fit break-all font-semibold">
                          {message.senderId.username}
                        </p>
                      )}
                      <p className="max-w-fit break-all"> {message.text}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      {isTyping && (
        <div
          className={`w-full flex justify-start pl-11 space-x-2 p-2`}
          ref={lastMessageRef}
        >
          <div className="bg-skeleton-purple p-2 rounded-lg rounded-tl-none max-w-full">
            Typing ...
          </div>
        </div>
      )}
      {selectedType === "users" &&
        !isMessagesLoading &&
        messages.length == 0 && <StartConvesrationWithNewFriend />}
    </div>
  );
};

export default ChatContent;
