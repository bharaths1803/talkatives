import {
  CircleUserRound,
  Loader,
  LogOut,
  MenuIcon,
  PlusSquareIcon,
  X,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { useState } from "react";
import CreateGroupDialog from "./CreateGroupDialog";

const ToggleSidebar = () => {
  const { logout, isLoggingout } = useAuthStore();
  const [toggleOpen, setToggleOpen] = useState(false);
  const [createGroupDialogOpen, setCreateGroupDialogOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const handleToggle = () => {
    setToggleOpen(!toggleOpen);
  };

  const handleCloseCreateGroupDialog = () => {
    setCreateGroupDialogOpen(false);
  };

  return (
    <>
      {createGroupDialogOpen && (
        <CreateGroupDialog
          open={createGroupDialogOpen}
          onClose={handleCloseCreateGroupDialog}
        />
      )}
      <div
        className={`h-full ${
          toggleOpen ? "w-24" : "w-12"
        } bg-custom-purple transition-all`}
      >
        <div className="py-3 h-full relative overflow-hidden">
          <div
            className={`text-black/80 flex ${
              toggleOpen ? "justify-end w-full" : "justify-start"
            }`}
          >
            {toggleOpen ? (
              <button
                className="hover:bg-slate-400/50 active:bg-slate-400 rounded-full p-2"
                onClick={handleToggle}
              >
                <X className="size-6" />
              </button>
            ) : (
              <button
                className="hover:bg-slate-400/50 active:bg-slate-400 rounded-full p-2"
                onClick={handleToggle}
              >
                <MenuIcon className="size-6" />
              </button>
            )}
          </div>
          <div className="h-[95%] flex flex-col justify-end items-center space-y-7">
            <button
              className="flex justify-center items-center text-black/80 hover:bg-slate-400/50 active:bg-slate-400 rounded-full p-2"
              onClick={() => setCreateGroupDialogOpen(true)}
            >
              <PlusSquareIcon className="size-6" />
              {toggleOpen && <div className="pl-2 text-black">Group</div>}
            </button>
            <Link
              className="flex justify-center items-center text-black/80 hover:bg-slate-400/50 active:bg-slate-400 rounded-full p-2"
              to={"/profile"}
            >
              <CircleUserRound className="size-6" />
              {toggleOpen && <div className="pl-2 text-black">Profile</div>}
            </Link>
            <button
              className="rotate-180 flex justify-center items-center text-black/80 hover:bg-slate-400/50 active:bg-slate-400 rounded-full p-2"
              onClick={handleLogout}
            >
              {isLoggingout ? (
                <Loader className="size-8 animate-spin pointer-events-none" />
              ) : (
                <>
                  {toggleOpen && (
                    <div className="pl-2 text-black rotate-180">Logout</div>
                  )}
                  <LogOut className="size-6" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToggleSidebar;
