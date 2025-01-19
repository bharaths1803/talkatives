import { Frown } from "lucide-react";

const NoUsersFound = () => {
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="flex flex-col justify-center items-center p-4 rounded-lg">
        <div className="p-3 size-12 bg-custom-gray flex justify-center items-center rounded-xl text-black group-hover:opacity-70 animate-bounce">
          <Frown className="size-8" />
        </div>
        <p className="text-black">No users found...</p>
      </div>
    </div>
  );
};

export default NoUsersFound;
