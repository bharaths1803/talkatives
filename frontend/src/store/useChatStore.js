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
  isTyping: false,
  isCreatingGroup: false,
  selectedType: "users",
  isGroupsLoading: false,
  groups: [],
  selectedGroup: null,
  isUpdatingGroupDescription: false,
  isUpdatingGroupPhoto: false,
  isAddingMembers: false,
  isExitingGroup: false,

  updateGroupDescription: async (description) => {
    try {
      const { selectedGroup } = get();
      set({ isUpdatingGroupDescription: true });
      const res = await axiosInstance.put(
        `/group/update-group-description/${selectedGroup._id}`,
        { description }
      );
      const { setSelectedGroup } = get();
      setSelectedGroup(res.data.group);
      toast.success("Group description updated successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingGroupDescription: false });
    }
  },

  updateGroupPhoto: async (profilePic) => {
    try {
      const { selectedGroup } = get();
      set({ isUpdatingGroupPhoto: true });
      const res = await axiosInstance.put(
        `/group/update-group-photo/${selectedGroup._id}`,
        { profilePic }
      );
      const { setSelectedGroup } = get();
      setSelectedGroup(res.data.group);
      toast.success("Group photo updated successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingGroupPhoto: false });
    }
  },

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
      const { selectedUser, messages } = get();
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
      const { selectedUser, selectedType, selectedGroup } = get();
      const res = await axiosInstance.get(
        `/message/${
          selectedType === "users" ? selectedUser._id : selectedGroup._id
        }`
      );
      set({ messages: res.data.messages });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  subscribeToMessages: async () => {
    try {
      const { socket } = useAuthStore.getState();
      if (!socket) return;
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

  setIsTyping: (isTyping) => {
    set({ isTyping });
  },

  subscribeToTypingEvents: () => {
    const { selectedUser } = get();
    const { socket } = useAuthStore.getState();
    if (!socket) return;
    socket.on("typing", (userId) => {
      if (userId === selectedUser._id) {
        get().setIsTyping(true);
      }
    });
    socket.on("stop-typing", (userId) => {
      if (userId === selectedUser._id) {
        get().setIsTyping(false);
      }
    });
  },

  unsubscribeFromTypingEvents: () => {
    const { socket } = useAuthStore.getState();
    if (!socket) return;
    socket.off("typing");
    socket.off("stop-typing");
  },

  createGroup: async (groupData) => {
    try {
      set({ isCreatingGroup: true });
      await axiosInstance.post(`/group/create`, groupData);
      toast.success("Group created Successfully");
      const { getGroups } = get();
      getGroups();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isCreatingGroup: false });
    }
  },

  setSelectedType: (selectedType) => {
    set({ selectedType });
  },

  getGroups: async () => {
    try {
      set({ isGroupsLoading: true });
      const res = await axiosInstance.get("/group/groups");
      set({ groups: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isGroupsLoading: false });
    }
  },

  setSelectedGroup: (selectedGroup) => {
    set({ selectedGroup });
  },

  addMembers: async (members) => {
    try {
      set({ isAddingMembers: true });
      const { selectedGroup } = get();
      await axiosInstance.put(`/group/add-members/${selectedGroup._id}`, {
        members,
      });
      const { getGroupById, getGroups } = get();
      getGroupById();
      getGroups();
      toast.success("Members added successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isAddingMembers: false });
    }
  },

  getGroupById: async () => {
    try {
      const { selectedGroup, setSelectedGroup } = get();
      const res = await axiosInstance.get(
        `/group/get-group-by-id/${selectedGroup._id}`
      );
      setSelectedGroup(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
    }
  },

  exitGroup: async () => {
    try {
      set({ isExitingGroup: true });
      const { selectedGroup } = get();
      await axiosInstance.delete(`/group/exit-group/${selectedGroup._id}`);
      const { getGroups, setSelectedGroup } = get();
      setSelectedGroup(null);
      getGroups();
      toast.success("Exited group successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isExitingGroup: false });
    }
  },
}));
