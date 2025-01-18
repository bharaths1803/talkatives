import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
  users: [],
  isUsersLoading: false,

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
}));
