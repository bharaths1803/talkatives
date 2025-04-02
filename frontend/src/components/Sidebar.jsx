import { CircleUserRound, Frown, Search } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import SidebarSkeleton from "../skeletons/SidebarSkeleton";
import NotFound from "../skeletons/NotFound";

const Sidebar = () => {
  const {
    getUsers,
    isUsersLoading,
    users,
    getSearchedUsers,
    setSelectedUser,
    selectedUser,
    getMessages,
    getGroups,
    groups,
    setSelectedType,
    selectedType,
    isGroupsLoading,
    setSelectedGroup,
    selectedGroup,
  } = useChatStore();

  useEffect(() => {
    getUsers();
    getGroups();
  }, [getUsers, getGroups]);

  const handleSearchUsers = (e) => {
    getSearchedUsers(e.target.value);
  };

  const handleSelectUser = (user) => {
    if (user === selectedGroup) return;
    setSelectedUser(user);
    getMessages();
  };

  const handleSelectGroup = (group) => {
    if (group === selectedGroup) return;
    setSelectedGroup(group);
    console.log("Seleceted group", selectedGroup);
    getMessages();
  };

  const handleSelectType = (selectedType) => {
    setSelectedGroup(null);
    setSelectedUser(null);
    setSelectedType(selectedType);
  };

  return (
    <div
      className={`h-full ${
        !selectedUser ? "w-full" : "w-0"
      } md:w-80 bg-soft-purple flex flex-col transition-all`}
    >
      <div className="py-4 px-0 flex-1 overflow-y-auto scrollbar-none">
        {/*Messages heading*/}
        <div className="pointer-events-none pl-2">
          <h1 className="font-inter font-bold text-3xl">Messages</h1>
        </div>
        <div className="mx-2 flex gap-3 mt-3">
          <button
            className={`w-20 text-sm bg-btn-primary text-white rounded-full p-1 flex justify-center items-center ${
              selectedType === "users" ? "opacity-100" : "opacity-60"
            }`}
            onClick={() => handleSelectType("users")}
          >
            Users
          </button>
          <button
            className={`w-20 text-sm bg-btn-primary text-white rounded-full p-1 flex justify-center items-center ${
              selectedType === "groups" ? "opacity-100" : "opacity-60"
            }`}
            onClick={() => handleSelectType("groups")}
          >
            Groups
          </button>
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
        {/*Not Found*/}
        {selectedType === "users" ? (
          <>{!isUsersLoading && users.length === 0 && <NotFound />}</>
        ) : (
          <>{!isGroupsLoading && !groups && <NotFound />}</>
        )}
        {/*Users*/}
        {selectedType === "users" ? (
          <div className="mt-6 mx-1 space-y-1">
            {!isUsersLoading &&
              users.length > 0 &&
              users.map((user) => (
                <button
                  key={user._id}
                  className={`w-full flex items-center h-14 pl-0 py-6 text-black/50 space-x-2 hover:bg-royal-purple ${
                    selectedUser === user
                      ? "bg-skeleton-purple pointer-events-none"
                      : ""
                  } active:bg-blue-400 space-x-3 rounded-lg`}
                  onClick={() => handleSelectUser(user)}
                >
                  {user.profilePicUrl ? (
                    <div className="size-10 ml-2">
                      <img
                        src={user.profilePicUrl}
                        alt="User profile pic"
                        className="size-full rounded-full"
                      />
                    </div>
                  ) : (
                    <div className="size-12 pl-2">
                      <CircleUserRound className="size-full" />
                    </div>
                  )}
                  <p className="text-black">{user.username}</p>
                </button>
              ))}
            {isUsersLoading && <SidebarSkeleton />}
          </div>
        ) : (
          <div className="mt-6 mx-1 space-y-1">
            {!isGroupsLoading &&
              groups &&
              groups.length > 0 &&
              groups.map((group) => (
                <button
                  key={group._id}
                  className={`w-full flex items-center h-14 pl-0 py-6 text-black/50 space-x-2 hover:bg-royal-purple ${
                    selectedGroup === group
                      ? "bg-skeleton-purple pointer-events-none"
                      : ""
                  } active:bg-blue-400 space-x-3 rounded-lg`}
                  onClick={() => handleSelectGroup(group)}
                >
                  {group.profilePicUrl ? (
                    <div className="size-10 ml-2">
                      <img
                        src={group.profilePicUrl}
                        alt="User profile pic"
                        className="size-full rounded-full"
                      />
                    </div>
                  ) : (
                    <div className="size-12 pl-2">
                      <CircleUserRound className="size-full" />
                    </div>
                  )}
                  <p className="text-black">{group.groupname}</p>
                </button>
              ))}
            {isGroupsLoading && <SidebarSkeleton />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
