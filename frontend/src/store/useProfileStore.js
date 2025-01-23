import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useProfileStore = create((set, get) => ({
  isUpdatingDescription: false,

  updateDescription: async (description) => {
    try {
      set({ isUpdatingDescription: true });
      const res = await axiosInstance.put("/users/update-description", {
        description,
      });
      const { authUser } = useAuthStore.getState();
      set({ authUser: res.data.user });
      toast.success("Updated description successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingDescription: false });
    }
  },
}));
