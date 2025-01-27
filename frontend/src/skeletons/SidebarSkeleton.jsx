const SidebarSkeleton = () => {
  const dummyArray = new Array(4).fill(null);
  return (
    <div className="space-y-14 pt-2">
      {dummyArray.map((_, idx) => (
        <button
          key={idx}
          className="w-full flex items-center bg-skeleton-purple rounded-lg h-14 p-3 space-x-2 animate-pulse"
        >
          <div className="size-10 bg-purple-700 rounded-full" />
          <div className="w-2/3 h-5 bg-purple-700" />
        </button>
      ))}
    </div>
  );
};

export default SidebarSkeleton;
