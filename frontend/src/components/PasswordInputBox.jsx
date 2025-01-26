import { Eye, EyeOff } from "lucide-react";

const PasswordInputBox = ({ onChange, value, onClick, showPassword }) => {
  return (
    <div className={`mt-4`}>
      <label class="font-poppins text-lg font-medium leading-[30px] text-left decoration-skip-ink-none">
        {"Password"}
      </label>
      <div className="flex items-center space-x-2 bg-custom-gray rounded-custom shadow-custom-inset-light">
        <input
          type={`${showPassword ? "text" : "password"}`}
          className="size-full bg-transparent  focus:outline-none pl-3 placeholder:text-gray-600 text-gray-800"
          placeholder={"••••••"}
          onChange={onChange}
          value={value}
        />
        <button
          className={`hover:bg-blue-400/50 active:bg-blue-400 rounded-full p-2 text-black/75`}
          onClick={onClick}
          type="button"
        >
          {showPassword ? (
            <Eye className="size-6" />
          ) : (
            <EyeOff className="size-6" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInputBox;
