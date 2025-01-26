import { useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import PasswordInputBox from "../components/PasswordInputBox";

const SignupPage = () => {
  const { signup } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);

  const [signupData, setSignupData] = useState({
    firsName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const isValidSignupData = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{3,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (
      !signupData.firstName ||
      !signupData.lastName ||
      !signupData.email ||
      !signupData.username ||
      !signupData.password
    ) {
      toast.error("All fields are required");
      return false;
    }
    if (!passwordRegex.test(signupData.password)) {
      toast.error(
        "Password must contain at least 3 characters, 1 uppercase, 1 lowercase, 1 special character, and 1 digit"
      );
      return false;
    }
    if (!emailRegex.test(signupData.email)) {
      toast.error("Invalid email");
      return false;
    }

    if (signupData.username.length > 16 || signupData.username.length <= 0) {
      toast.error("Username can not exceed 16 characters");
      return false;
    }
    return true;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (isValidSignupData()) signup(signupData);
  };

  return (
    <div className="w-full h-screen flex bg-custom-gradient">
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
            onSubmit={handleSignup}
          >
            <Heading label={"Signup"} />
            <InputBox
              labelText={"Email"}
              placeholderText={"you@example.com"}
              value={signupData.email}
              onChange={(e) => {
                e.preventDefault();
                setSignupData({ ...signupData, email: e.target.value.trim() });
              }}
            />
            <div className="flex flex-col md:flex-row md:space-x-2">
              <InputBox
                labelText={"First Name"}
                placeholderText={"Taylor"}
                halfSized={true}
                value={signupData.firstName}
                onChange={(e) => {
                  e.preventDefault();
                  setSignupData({
                    ...signupData,
                    firstName: e.target.value.trim(),
                  });
                }}
              />
              <InputBox
                labelText={"Last Name"}
                placeholderText={"Swift"}
                halfSized={true}
                value={signupData.lastName}
                onChange={(e) => {
                  e.preventDefault();
                  setSignupData({
                    ...signupData,
                    lastName: e.target.value.trim(),
                  });
                }}
              />
            </div>
            <div className="flex flex-col md:flex-row md:space-x-2">
              <div className="w-full">
                <InputBox
                  labelText={"Username"}
                  placeholderText={"taylor_swifto2"}
                  value={signupData.username}
                  onChange={(e) => {
                    e.preventDefault();
                    setSignupData({
                      ...signupData,
                      username: e.target.value.trim(),
                    });
                  }}
                />
              </div>
              <div className="w-full">
                <PasswordInputBox
                  onChange={(e) => {
                    e.preventDefault();
                    setSignupData({ ...signupData, password: e.target.value });
                  }}
                  value={signupData.password}
                  onClick={() => setShowPassword(!showPassword)}
                  showPassword={showPassword}
                />
              </div>
            </div>
            <div>
              <Button buttonText={"Create Account"} onClick={handleSignup} />
              <BottomWarning
                warningText={"Already have an account?"}
                navigateToText={"Login"}
                navigateTo={"/login"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
