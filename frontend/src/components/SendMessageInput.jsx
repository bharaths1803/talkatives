import { Send, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import EmojiPicker from "emoji-picker-react";

const SendMessageInput = () => {
  const { sendMessage } = useChatStore();
  const [text, setText] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const emojiPickerRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target)
      ) {
        setEmojiPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMessageTyping = (e) => {
    setText(e.target.value);
  };

  const handleSendMessage = () => {
    if (!text.trim()) {
      setText("");
      return;
    }
    sendMessage({
      text: text.trim(),
    });
    setText("");
  };

  const handleToggleEmojiPicker = () => {
    setEmojiPickerOpen(!emojiPickerOpen);
  };

  const handleEmojiSelect = (e) => {
    setText((text) => text + e.emoji);
  };

  return (
    <div className="bg-search-purple p-2">
      <div className="bg-royal-purple h-12 rounded-full flex justify-center items-center pr-3 relative pl-2">
        <button
          className="hidden md:block text-black/80 hover:bg-slate-400/50 active:bg-slate-400 rounded-full p-2"
          onClick={handleToggleEmojiPicker}
        >
          <Smile className="size-6" />
        </button>
        <input
          type="text"
          placeholder="Type a message"
          className="size-full border-none focus:outline-none bg-transparent placeholder:text-black pl-3"
          onChange={handleMessageTyping}
          value={text}
        />
        <button
          className="text-black/80 hover:bg-slate-400/50 active:bg-slate-400 rounded-full p-2"
          onClick={handleSendMessage}
        >
          <Send className="size-5" />
        </button>
        {emojiPickerOpen && (
          <div className="absolute bottom-14 left-0" ref={emojiPickerRef}>
            <EmojiPicker onEmojiClick={handleEmojiSelect} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SendMessageInput;
