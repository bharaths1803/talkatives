import {
  Eye,
  EyeOff,
  Loader,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import AnimationPattern from "../components/AnimationPattern";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSigningUp(true);
    setTimeout(() => setIsSigningUp(false), 2000);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      <div className="bg-red-400 flex justify-center items-center p-6 sm:12">
        <div className="w-full max-w-md space-y-8">
          {/*Top group*/}
          <div className="text-center mb-8 flex flex-col items-center gap-2 group">
            <div className="bg-cyan-300/10 size-12 rounded-2xl flex justify-center items-center group-hover:bg-cyan-300/20">
              <MessageSquare className="size-6 text-red-300" />
            </div>
            <h2 className="text-2xl font-bold mt-2">Create Account</h2>
            <p className="text-red-300">Get started with your free account</p>
          </div>
          {/*Form*/}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/*Username*/}
            <div>
              <label className="font-medium">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex justify-center items-center">
                  <User className="size-6 bg-gray-50 text-red-900/10" />
                </div>
                <input
                  type="text"
                  placeholder="Bharath"
                  className="pl-10 w-full max-w-md rounded-2xl size-10"
                />
              </div>
            </div>
            {/*Email*/}
            <div>
              <label className="font-medium">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex justify-center items-center">
                  <Mail className="size-6 bg-gray-50 text-red-900/10" />
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="size-10 rounded-2xl w-full max-w-md pl-10"
                />
              </div>
            </div>
            {/*Password*/}
            <div>
              <label className="font-medium">Password</label>
              <div className="relative">
                <div className="flex justify-center items-center absolute inset-y-0 left-0 pl-3">
                  <Lock className="size-6 bg-gray-50 text-red-900/10" />
                </div>
                <input
                  className="pl-10 size-10 rounded-2xl w-full max-w-md"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••"
                />
                <button
                  type="button"
                  className="flex justify-center items-center absolute inset-y-0 right-0 pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="size-6 bg-gray-50 text-red-900/50" />
                  ) : (
                    <EyeOff className="size-6 bg-gray-50 text-red-900/50" />
                  )}
                </button>
              </div>
            </div>
            {/*Sign in button*/}
            <button
              type="submit"
              className="w-full size-10 rounded-lg max-w-md bg-cyan-300 "
            >
              {isSigningUp ? (
                <div className="flex justify-center items-center">
                  <Loader className="size-6 animate-spin" />
                </div>
              ) : (
                "Signin"
              )}
            </button>
          </form>
          {/*Going to login page*/}
          <div className="text-center">
            <p className="text-red-300">
              Already have an account?{" "}
              <Link
                className="text-blue-900/20 underline hover:text-blue-900/30"
                to={"/login"}
              >
                {" "}
                Signin
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AnimationPattern
        subTitle={
          "Connect with friends, share moments and stay in touch with your loved ones"
        }
        title={"Join our community"}
      />
    </div>
  );
};

export default SignupPage;
