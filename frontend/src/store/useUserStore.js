import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useChatStore } from "./useChatStore";

export const useUserStore = create((set, get) => ({
  isBlockingOrUnblockingUser: false,

  blockOrUnblockUser: async (block) => {
    try {
      set({ isBlockingOrUnblockingUser: true });
      const { selectedUser } = useChatStore.getState();
      const res = await axiosInstance.put(
        `/users/block-or-unblock/${selectedUser._id}`,
        { block }
      );
      useAuthStore.setState({ authUser: res.data.user });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isBlockingOrUnblockingUser: false });
    }
  },

  subscribeToBlockingOrUnblockingEvent: () => {
    const { socket } = useAuthStore.getState();
    socket.on("block-or-unblock", (user) => {
      useChatStore.setState({ selectedUser: user });
    });
  },

  unsubscribeFromBlockingOrUnblockingEvent: () => {
    const { socket } = useAuthStore.getState();
    if (!socket) return;
    socket.off("block-or-unblock");
  },
}));
