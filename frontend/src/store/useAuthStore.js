import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const res = await axiosInstance.get("/auth/check-auth");
      const user = res.data.user;
      set({ authUser: user });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (formData) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosInstance.post("/auth/signup", formData);
      set({ authUser: res.data.user });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (formData) => {
    try {
      set({ isLoggingIn: true });
      const res = await axiosInstance.post("/auth/login", formData);
      set({ authUser: res.data.user });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoggingOut: true });
      const res = await axiosInstance.post("/auth/logout");
      toast.success(res.data.message);
      set({ authUser: null });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingOut: false });
    }
  },
}));
