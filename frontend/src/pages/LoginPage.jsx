import { useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { login } = useAuthStore();

  const [loginData, setLoginData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const isValidLoginData = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{3,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!loginData.email || !loginData.username || !loginData.password) {
      return toast.error("All fields are required");
    }
    if (!passwordRegex.test(loginData.password)) {
      return toast.error(
        "Password must contain at least 3 characters, 1 uppercase, 1 lowercase, 1 special character, and 1 digit"
      );
    }
    if (!emailRegex.test(loginData.email)) {
      return toast.error("Invalid email");
    }
    return true;
  };

  const handleLoggingin = () => {
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
          <div className="space-y-4 bg-lightGrayTransparent w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-lg 2xl:max-w-xl border border-soft-white rounded-3xl shadow-custom-inset-light backdrop-blur-custom p-3">
            <Heading label={"Login"} />
            <InputBox
              labelText={"Email"}
              placeholderText={"you@example.com"}
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
            <InputBox
              labelText={"Username"}
              placeholderText={"taylor_swifto"}
              value={loginData.username}
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
            />
            <InputBox
              labelText={"Password"}
              placeholderText={"••••••"}
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            <div>
              <Button buttonText={"Login"} onClick={handleLoggingin} />
              <BottomWarning
                warningText={"Don't have an account?"}
                navigateToText={"Sign Up"}
                navigateTo={"/signup"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
