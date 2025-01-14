import { Loader } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Button = ({ buttonText, onClick }) => {
  const { isSigningup, isLoggingin } = useAuthStore();
  return (
    <button
      className="bg-btn-primary shadow-custom-btn2 text-white w-full rounded-3xl size-10 hover:opacity-80 mt-4"
      onClick={onClick}
    >
      {isSigningup || isLoggingin ? (
        <div className="flex justify-center items-center">
          <Loader className="size-5 animate-spin" />
        </div>
      ) : (
        buttonText
      )}
    </button>
  );
};

export default Button;
