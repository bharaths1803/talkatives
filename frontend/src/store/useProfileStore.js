import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useProfileStore = create((set, get) => ({
  isUpdatingProfile: false,

  updateProfile: async (updateData) => {
    try {
      set({ isUpdatingProfile: true });
      const res = await axiosInstance.put("/users/update-profile", updateData);
      const { authUser } = useAuthStore.getState();
      set({ authUser: res.data.user });
      toast.success("Updated profile successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
