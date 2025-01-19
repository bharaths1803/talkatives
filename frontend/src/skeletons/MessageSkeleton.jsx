const MessageSkeleton = () => {
  const dummyArray = new Array(3).fill(null);
  return (
    <>
      {dummyArray.map((_, idx) =>
        idx % 2 == 0 ? (
          <div key={idx} className="w-full space-y-2 p-2 mt-6 animate-pulse">
            <div className="flex space-x-2 w-full justify-end">
              <div className="bg-skeleton-purple p-3 rounded-lg rounded-tr-none w-1/2" />
              <div className="size-7 bg-skeleton-purple rounded-full" />
            </div>
            <div className="flex space-x-2 w-full h-40  justify-end">
              <div className="bg-skeleton-purple p-3 rounded-full w-1/2 mr-9" />
            </div>
            <div className="flex space-x-2 w-full justify-end">
              <div className="bg-skeleton-purple p-3 rounded-lg w-1/2 mr-9" />
            </div>
          </div>
        ) : (
          <div key={idx} className="w-full space-y-2 p-2 mt-6 animate-pulse">
            <div className="flex space-x-2 w-full justify-start">
              <div className="size-7 bg-skeleton-purple rounded-full" />
              <div className="bg-skeleton-purple p-3 rounded-lg rounded-tl-none w-1/2" />
            </div>
            <div className="flex space-x-2 w-full h-40 justify-start">
              <div className="bg-skeleton-purple p-3 rounded-full w-1/2 ml-9" />
            </div>
            <div className="flex space-x-2 w-full justify-start">
              <div className="bg-skeleton-purple p-3 rounded-lg w-1/2 ml-9" />
            </div>
          </div>
        )
      )}
    </>
  );
};

export default MessageSkeleton;
