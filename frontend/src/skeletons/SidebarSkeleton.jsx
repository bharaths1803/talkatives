const SidebarSkeleton = () => {
  const dummyArray = new Array(6).fill(null);
  return (
    <div className="space-y-14 pt-2">
      {dummyArray.map((_, idx) => (
        <button className="w-full flex items-center bg-skeleton-purple rounded-3xl h-10 p-3 space-x-2 animate-pulse">
          <div className="size-5 bg-purple-700 rounded-full" />
          <div className="w-2/3 h-5 bg-purple-700 rounded-full" />
        </button>
      ))}
    </div>
  );
};

export default SidebarSkeleton;
