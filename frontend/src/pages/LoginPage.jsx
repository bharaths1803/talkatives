import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";

const LoginPage = () => {
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
      <div className="w-full lg:w-[50%] flex justify-center items-center">
        <div className="space-y-4 bg-lightGrayTransparent w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-lg 2xl:max-w-xl border border-soft-white rounded-3xl shadow-custom-inset-light backdrop-blur-custom p-3">
          <Heading label={"Login"} />
          <InputBox labelText={"Email"} placeholderText={"you@example.com"} />
          <InputBox labelText={"Password"} placeholderText={"••••••"} />
          <InputBox labelText={"Confirm Password"} placeholderText={"••••••"} />
          <div>
            <Button buttonText={"Login"} />
            <BottomWarning
              warningText={"Don't have an account?"}
              navigateToText={"Sign Up"}
              navigateTo={"/signup"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
