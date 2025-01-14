import { MessageCircle } from "lucide-react";

const Heading = ({ label }) => {
  return (
    <div className="group">
      <div className="flex justify-center items-center group">
        <div className="size-12 bg-custom-gray flex justify-center items-center rounded-xl text-red-300 group-hover:opacity-70">
          <MessageCircle className="size-6" />
        </div>
      </div>
      <h1 className="font-poppins text-2xl text-center font-extrabold leading-[54px] decoration-skip-ink-none">
        {label}
      </h1>
    </div>
  );
};

export default Heading;
