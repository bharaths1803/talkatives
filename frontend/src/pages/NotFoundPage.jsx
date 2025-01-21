import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-not-found-purple">
      <div className="text-center space-y-8 p-3">
        <h1 className="text-8xl font-bold">OOPS!</h1>
        <h3 className="text-2xl font-semibold">Page not found</h3>
        <div className="w-full flex justify-center items-center">
          <img
            className="size-40 animate-bounce-once"
            src="emoji.png"
            alt="sad emoji"
          />
        </div>
        <h2 className="text-4xl font-bold">404 ERROR</h2>
        <h3 className="text-3xl font-semibold">
          Lost your way? Let's reach out to your friends
        </h3>
        <button
          className="bg-btn-primary text-white rounded-full p-3 w-56 hover:opacity-80 active:opacity-60
        "
          onClick={handleRedirect}
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
