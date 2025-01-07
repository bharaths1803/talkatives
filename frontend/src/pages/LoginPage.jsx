import { useState } from "react";
import { Eye, EyeOff, Loader, Lock, Mail, MessageSquare } from "lucide-react";
import AnimationPattern from "../components/AnimationPattern";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => setIsLoggingIn(false), 2000);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/*Left login page*/}

      <div className="bg-red-400 flex justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/*Top Group*/}
          <div className="text-center mb-8 flex flex-col items-center gap-2 group">
            <div className="size-12 rounded-2xl bg-cyan-300/10 group-hover:bg-cyan-300/20 flex justify-center items-center">
              <MessageSquare className="size-6 text-red-300" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Welcome back</h1>
            <p className="text-red-300">Sign in to your account</p>
          </div>
          {/*Form*/}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/*Email*/}
            <div>
              <label className="font-medium">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-6 bg-gray-50 text-red-900/10" />
                </div>
                <input
                  type="email"
                  className="w-full max-w-md size-10 rounded-2xl pl-10"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            {/*Password*/}
            <div>
              <label className="font-medium">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-6 bg-gray-50 text-red-900/10" />
                </div>
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  className="w-full max-w-md size-10 rounded-2xl pl-10"
                  placeholder="••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="size-6 bg-gray-50 text-red-900/10" />
                  ) : (
                    <EyeOff className="size-6 bg-gray-50 text-red-900/10" />
                  )}
                </button>
              </div>
            </div>
            {/*Button*/}
            <button
              type="submit"
              className="size-10 w-full max-w-md bg-cyan-300 rounded-lg"
            >
              {isLoggingIn ? (
                <div className="flex justify-center items-center">
                  <Loader className="size-6 animate-spin" />
                </div>
              ) : (
                "SignIn"
              )}
            </button>
          </form>

          {/*Going to signup page*/}
          <div className="text-center">
            <p className="text-red-300">
              {"Don't have an account?"}{" "}
              <Link
                to={"/signup"}
                className="underline text-blue-900/20 hover:text-blue-900/30"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/*Right image pattern*/}
      <AnimationPattern
        title={"welcome back"}
        subTitle={"Sign in to continue and catch up conversations"}
      />
    </div>
  );
};

export default LoginPage;
