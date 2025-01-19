import { Send } from "lucide-react";

const SendMessageInput = () => {
  return (
    <div className="bg-search-purple h-max p-2">
      <div className="bg-royal-purple h-12 rounded-full flex justify-center items-center pr-3">
        <input
          type="text"
          placeholder="Type a message"
          className="size-full border-none focus:outline-none bg-transparent placeholder:text-black pl-3"
        />
        <div>
          <Send className="size-5" />
        </div>
      </div>
    </div>
  );
};

export default SendMessageInput;
