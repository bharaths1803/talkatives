import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  messages: [],
  isMessagesLoading: false,

  getUsers: async () => {
    try {
      set({ isUsersLoading: true });
      const res = await axiosInstance.get("/users");
      set({ users: res.data.users });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getSearchedUsers: async (filter) => {
    try {
      const res = await axiosInstance.get(`/users/bulk?filter=${filter}`);
      set({ users: res.data.users });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },

  sendMessage: async (messageData) => {
    try {
      console.log(messageData);
      const { selectedUser, messages } = get();
      console.log(selectedUser._id);
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messageData
      );

      set({ messages: [...messages, res.data.message] });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  getMessages: async () => {
    try {
      set({ isMessagesLoading: true });
      const { selectedUser } = get();
      const res = await axiosInstance.get(`/message/${selectedUser._id}`);
      set({ messages: res.data.messages });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  subscribeToMessages: async () => {
    try {
      const { authUser, socket } = useAuthStore.getState();
      const { selectedUser } = get();
      socket.on("newMessage", (message) => {
        const isMessageSentFromSelectedUser =
          message.senderId === selectedUser._id;
        if (!isMessageSentFromSelectedUser) return;
        const { messages } = get();
        set({ messages: [...messages, message] });
      });
    } catch (error) {
      console.log(`Failed subscribing to messages`);
    }
  },

  unsubscribeFromMessages: async () => {
    try {
      const { authUser, socket } = useAuthStore.getState();
      if (!authUser || !socket) return;
      socket.off("newMessage");
    } catch (error) {
      console.log(`Failed subscribing to messages`);
    }
  },
}));
