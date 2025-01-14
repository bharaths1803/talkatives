import { useAuthStore } from "../store/useAuthStore";

const Homepage = () => {
  const { logout } = useAuthStore();
  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <button onClick={handleLogout} className="bg-red-700 text-red-50">
        Logout
      </button>
    </div>
  );
};

export default Homepage;
