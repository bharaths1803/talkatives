const AnimationPattern = ({ title, subTitle }) => {
  return (
    <div className="hidden lg:flex justify-center items-center p-12 bg-red-500">
      {" "}
      <div className="max-w-md text-center">
        {" "}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {" "}
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`size-36 aspect-square rounded-2xl bg-blue-700 ${
                i % 2 == 0 ? "animate-pulse" : ""
              }`}
            ></div>
          ))}{" "}
        </div>{" "}
        <h2 className="text-2xl font-bold mb-4">{title}</h2>{" "}
        <p className="text-red-300">{subTitle}</p>{" "}
      </div>{" "}
    </div>
  );
};

export default AnimationPattern;
