import { Send } from "lucide-react";
import { useState } from "react";
import { useChatStore } from "../store/useChatStore";

const SendMessageInput = () => {
  const { sendMessage } = useChatStore();
  const [text, setText] = useState("");

  const handleMessageTyping = (e) => {
    setText(e.target.value);
  };

  const handleSendMessage = () => {
    console.log(text);
    sendMessage({
      text: text.trim(),
    });
    setText("");
  };

  return (
    <div className="bg-search-purple h-max p-2">
      <div className="bg-royal-purple h-12 rounded-full flex justify-center items-center pr-3">
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
      </div>
    </div>
  );
};

export default SendMessageInput;
