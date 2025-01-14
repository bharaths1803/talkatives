import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";

const SignupPage = () => {
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
          <Heading label={"Signup"} />
          <InputBox labelText={"Email"} placeholderText={"you@example.com"} />
          <div className="flex flex-col md:flex-row md:space-x-2">
            <InputBox
              labelText={"First Name"}
              placeholderText={"Taylor"}
              halfSized={true}
            />
            <InputBox
              labelText={"Last Name"}
              placeholderText={"Swift"}
              halfSized={true}
            />
          </div>
          <div className="flex flex-col md:flex-row md:space-x-2">
            <div className="w-full">
              <InputBox labelText={"Password"} placeholderText={"••••••"} />
            </div>
            <div className="w-full">
              <InputBox
                labelText={"Confirm Password"}
                placeholderText={"••••••"}
              />
            </div>
          </div>
          <div>
            <Button buttonText={"Create Account"} />
            <BottomWarning
              warningText={"Already have an account?"}
              navigateToText={"Login"}
              navigateTo={"/login"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
