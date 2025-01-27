import { CircleUserRound, Frown, Search } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import SidebarSkeleton from "../skeletons/SidebarSkeleton";
import NoUsersFound from "../skeletons/NoUsersFound";

const Sidebar = () => {
  const {
    getUsers,
    isUsersLoading,
    users,
    getSearchedUsers,
    setSelectedUser,
    selectedUser,
    getMessages,
  } = useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleSearchUsers = (e) => {
    getSearchedUsers(e.target.value);
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    getMessages();
  };

  return (
    <div
      className={`h-full ${
        !selectedUser ? "w-full" : "w-0"
      } md:w-80 bg-soft-purple flex flex-col transition-all`}
    >
      <div className="p-4 flex-1 overflow-y-auto scrollbar-none">
        {/*Messages heading*/}
        <div className="pointer-events-none">
          <h1 className="font-inter font-bold text-3xl">Messages</h1>
        </div>
        {/*Users search bar*/}
        <div className="mt-6 flex bg-royal-purple rounded-3xl h-10 p-3">
          <input
            type="text"
            className="w-full bg-transparent border-none focus:outline-none pl-2 placeholder:text-black"
            placeholder="Search"
            onChange={handleSearchUsers}
          />
          <div className="flex justify-center items-center">
            <Search className="size-5" />
          </div>
        </div>
        {/*No Users Found*/}
        {!isUsersLoading && users.length === 0 && <NoUsersFound />}
        {/*Users*/}
        <div className="mt-6 mx-4 space-y-4">
          {!isUsersLoading &&
            users.length > 0 &&
            users.map((user) => (
              <button
                key={user._id}
                className={`w-full flex items-center bg-royal-purple/75 rounded-3xl h-10 p-3 ${
                  user.profilePicUrl ? "pl-0" : ""
                } text-black/50 space-x-2 hover:bg-royal-purple ${
                  selectedUser === user
                    ? "bg-skeleton-purple pointer-events-none"
                    : ""
                } active:bg-blue-400`}
                onClick={() => handleSelectUser(user)}
              >
                {user.profilePicUrl ? (
                  <div className="size-10">
                    <img
                      src={user.profilePicUrl}
                      alt="User profile pic"
                      className="size-full rounded-full"
                    />
                  </div>
                ) : (
                  <CircleUserRound className="size-7" />
                )}
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
