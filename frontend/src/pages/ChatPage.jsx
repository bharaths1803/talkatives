import ToggleSidebar from "../components/ToggleSidebar";
import { useAuthStore } from "../store/useAuthStore";
import ChatContainer from "../components/ChatContainer";
import Sidebar from "../components/Sidebar";

const Homepage = () => {
  const { logout } = useAuthStore();
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="h-screen w-screen flex overflow-y-auto">
      <ToggleSidebar />
      <Sidebar />
      <ChatContainer />
    </div>
  );
};

export default Homepage;
