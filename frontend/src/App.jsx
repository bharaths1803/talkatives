import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/Homepage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";

function App() {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!authUser && isCheckingAuth) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/signup" />}
        />
        <Route
          path="/"
          element={authUser ? <Homepage /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
