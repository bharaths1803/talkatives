import { ImageUp, Send, Smile, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import EmojiPicker from "emoji-picker-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";

const SendMessageInput = () => {
  const {
    selectedUser,
    sendMessage,
    selectedType,
    selectedGroup,
    sendGroupMessage,
  } = useChatStore();
  const { socket, authUser } = useAuthStore();
  const {
    subscribeToBlockingOrUnblockingEvent,
    unsubscribeFromBlockingOrUnblockingEvent,
  } = useUserStore();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const emojiPickerRef = useRef();
  const imageUploadInputBoxRef = useRef(null);

  const TIME_DELAY = 2000;
  let timeout;

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
    if (selectedType === "users") subscribeToBlockingOrUnblockingEvent();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (selectedType === "users") unsubscribeFromBlockingOrUnblockingEvent();
    };
  }, []);

  useEffect(() => {
    handleCloseImage();
    setText("");
  }, [selectedUser]);

  const handleMessageTyping = (e) => {
    if (
      selectedType === "users" &&
      selectedUser.blockedUsers.includes(authUser._id)
    )
      return;
    setText(e.target.value);
    if (selectedType === "users") {
      socket.emit("typing", selectedUser._id);
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        socket.emit("stop-typing", selectedUser._id);
      }, TIME_DELAY);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (
      selectedType === "users" &&
      selectedUser.blockedUsers.includes(authUser._id)
    )
      return;
    if (!text.trim() && !image) {
      setText("");
      setImage(null);
      return;
    }
    if (selectedType === "users")
      sendMessage({
        text: text.trim(),
        image: image,
      });
    else
      sendGroupMessage({
        text: text.trim(),
        image: image,
      });

    setText("");
    setImage(null);
    if (selectedType === "users") socket.emit("stop-typing", selectedUser._id);
  };

  const handleToggleEmojiPicker = (e) => {
    e.preventDefault();
    if (
      selectedType === "users" &&
      selectedUser.blockedUsers.includes(authUser._id)
    )
      return;
    setEmojiPickerOpen(!emojiPickerOpen);
  };

  const handleEmojiSelect = (e) => {
    setText((text) => text + e.emoji);
  };

  const handleImageUpload = () => {
    if (
      selectedType === "users" &&
      selectedUser.blockedUsers.includes(authUser._id)
    )
      return;
    if (imageUploadInputBoxRef) {
      imageUploadInputBoxRef.current.click();
    }
  };

  const loadImage = (e) => {
    if (
      selectedType === "users" &&
      selectedUser.blockedUsers.includes(authUser._id)
    )
      return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64Image = reader.result;
      if (!base64Image.startsWith("data:image/")) {
        toast.error("Upload an image only");
        return;
      }
      setImage(base64Image);
    };
  };

  const handleCloseImage = () => {
    setImage(null);
    if (imageUploadInputBoxRef.current) {
      imageUploadInputBoxRef.current.value = "";
    }
  };

  return (
    <div className="bg-search-purple p-2 relative">
      <form
        className="bg-royal-purple h-12 rounded-full flex justify-center items-center pr-3 relative pl-2"
        onSubmit={handleSendMessage}
      >
        <button
          className="hidden md:block text-black/80 hover:bg-slate-400/50 active:bg-slate-400 rounded-full p-2"
          onClick={handleToggleEmojiPicker}
          type="button"
        >
          <Smile className="size-6" />
        </button>
        <button
          className=" text-black/80 hover:bg-slate-400/50 active:bg-slate-400 rounded-full p-2"
          onClick={handleImageUpload}
          type="button"
        >
          <ImageUp className="size-6" />
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
      </form>
      <div
        className={`${
          image ? "absolute" : "hidden"
        } top-0 right-16 -translate-y-24 bg-skeleton-purple size-24 flex justify-center items-center rounded-lg rounded-tr-none p-2`}
      >
        <button
          className="absolute top-0 right-0 hover:bg-slate-400/50 active:bg-slate-400 rounded-full"
          onClick={handleCloseImage}
        >
          <X className="size-5" />
        </button>
        <img src={image} alt="Image as message" className="size-full" />
        <input
          type="file"
          className="hidden"
          ref={imageUploadInputBoxRef}
          onChange={loadImage}
        />
      </div>
    </div>
  );
};

export default SendMessageInput;
