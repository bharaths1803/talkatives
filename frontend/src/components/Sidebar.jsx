import { CircleUserRound, Search } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import SidebarSkeleton from "../skeletons/SidebarSkeleton";

const Sidebar = () => {
  const { getUsers, isUsersLoading, users } = useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="h-full w-full md:w-80 bg-soft-purple flex flex-col">
      <div className="p-4 flex-1 overflow-y-auto scrollbar-none">
        {/*Messages heading*/}
        <div className="">
          <h1 className="font-inter font-bold text-3xl">Messages</h1>
        </div>
        {/*Users search bar*/}
        <div className="mt-6 flex bg-royal-purple rounded-3xl h-10 p-3">
          <input
            type="text"
            className="w-full bg-transparent border-none focus:outline-none pl-2 placeholder:text-black"
            placeholder="Search"
          />
          <div className="flex justify-center items-center">
            <Search className="size-5" />
          </div>
        </div>
        {/*Users*/}
        <div className="mt-6 mx-4 space-y-4">
          {!isUsersLoading && users.length === 0 && <div>No users found</div>}
          {!isUsersLoading &&
            users.length > 0 &&
            users.map((user) => (
              <button className="w-full flex items-center bg-royal-purple/75 rounded-3xl h-10 p-3 text-black/50 space-x-2 hover:bg-royal-purple">
                <CircleUserRound className="size-7" />
                <p className="text-black">{user.username}</p>
              </button>
            ))}
          {isUsersLoading && <SidebarSkeleton />}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
