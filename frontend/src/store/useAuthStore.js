import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { io } from "socket.io-client";

const baseUrl =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningup: false,
  isLoggingin: false,
  isLoggingout: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const res = await axiosInstance.get("/auth/check-auth");
      get().connectSocket();
      set({ authUser: res.data.user });
    } catch (error) {
      console.log("");
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (signupData) => {
    try {
      set({ isSigningup: true });
      const res = await axiosInstance.post("/auth/signup", signupData);
      set({ authUser: res.data.user });
      get().connectSocket();
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
      get().connectSocket();
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
      get().disconnectSocket();
      toast.success(res.data.message);
      set({ authUser: null });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingout: false });
    }
  },

  connectSocket: async () => {
    try {
      const { authUser } = get();
      if (!authUser || get().socket?.connected) return;
      const socket = io(baseUrl, {
        query: {
          userId: authUser._id,
        },
      });
      socket.connect();
      set({ socket });
      socket.on("onlineusers", (onlineUsers) => {
        set({ onlineUsers });
      });
    } catch (error) {
      console.log(`Error connecting to socket ${error}`);
    }
  },

  disconnectSocket: async () => {
    try {
      const { socket } = get();
      if (!socket) return;
      socket.disconnect();
      set({ socket: null });
    } catch (error) {
      console.log(`Error disconnecting socket ${error}`);
    }
  },
}));
