import { useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import PasswordInputBox from "../components/PasswordInputBox";

const LoginPage = () => {
  const { login } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const isValidLoginData = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{3,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!loginData.email || !loginData.username || !loginData.password) {
      toast.error("All fields are required");
      return false;
    }
    if (!passwordRegex.test(loginData.password)) {
      toast.error(
        "Password must contain at least 3 characters, 1 uppercase, 1 lowercase, 1 special character, and 1 digit"
      );
      return false;
    }
    if (!emailRegex.test(loginData.email)) {
      toast.error("Invalid email");
      return false;
    }
    return true;
  };

  const handleLoggingin = (e) => {
    e.preventDefault();
    if (isValidLoginData()) login(loginData);
  };

  return (
    <div className="w-screen h-screen flex bg-custom-gradient">
      <div className="hidden lg:w-[50%] lg:flex justify-center items-center">
        <div className="bg-lightGrayTransparenth p-3">
          <img
            src="background_processed_processed.jpg"
            alt="Background image"
          />
        </div>
      </div>
      <div className="w-full lg:w-[50%] mx-auto my-auto">
        <div className="w-full flex justify-center items-center">
          <form
            className="space-y-4 bg-lightGrayTransparent w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-lg 2xl:max-w-xl border border-soft-white rounded-3xl shadow-custom-inset-light backdrop-blur-custom p-3"
            onSubmit={handleLoggingin}
          >
            <Heading label={"Login"} />
            <InputBox
              labelText={"Email"}
              placeholderText={"you@example.com"}
              value={loginData.email}
              onChange={(e) => {
                e.preventDefault();
                setLoginData({ ...loginData, email: e.target.value });
              }}
            />
            <InputBox
              labelText={"Username"}
              placeholderText={"taylor_swifto"}
              value={loginData.username}
              onChange={(e) => {
                e.preventDefault();
                setLoginData({ ...loginData, username: e.target.value });
              }}
            />
            <PasswordInputBox
              onChange={(e) => {
                e.preventDefault();
                setLoginData({ ...loginData, password: e.target.value });
              }}
              value={loginData.password}
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
              showPassword={showPassword}
            />
            <div>
              <Button buttonText={"Login"} onClick={handleLoggingin} />
              <BottomWarning
                warningText={"Don't have an account?"}
                navigateToText={"Sign Up"}
                navigateTo={"/signup"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
