import { CircleUserRound, Loader, LogOut, MenuIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const ToggleSidebar = () => {
  const { logout, isLoggingout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="h-full w-24 bg-custom-purple">
      <div className="mx-2 py-8 p-4 h-full relative overflow-hidden">
        <button className="flex justify-center items-center text-black/80 bg-slate-400/50 hover:bg-slate-400 rounded-full p-2">
          <MenuIcon className="size-9" />
        </button>
        <div className="h-[95%] flex flex-col justify-end items-center space-y-7">
          <Link
            className="flex justify-center items-center text-black/80 bg-slate-400/50 hover:bg-slate-400 rounded-full p-2"
            to={"/profile"}
          >
            <CircleUserRound className="size-9" />
          </Link>
          <button
            className="rotate-180 flex justify-center items-center text-black/80 bg-slate-400/50 hover:bg-slate-400 rounded-full p-2"
            onClick={handleLogout}
          >
            {isLoggingout ? (
              <Loader className="size-8 animate-spin pointer-events-none" />
            ) : (
              <LogOut className="size-8" />
            )}
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ToggleSidebar;
