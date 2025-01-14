import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningup: false,
  isLoggingin: false,
  isLoggingout: false,

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

  signup: async (signupData) => {
    try {
      set({ isSigningup: true });
      const res = await axiosInstance.post("/auth/signup", signupData);
      set({ authUser: res.data.user });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningup: false });
    }
  },

  login: async (loginData) => {
    try {
      set({ isLoggingin: true });
      const res = await axiosInstance.post("/auth/login", loginData);
      set({ authUser: res.data.user });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingin: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoggingout: true });
      const res = await axiosInstance.post("/auth/logout");
      toast.success(res.data.message);
      set({ authUser: null });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingout: false });
    }
  },
}));
