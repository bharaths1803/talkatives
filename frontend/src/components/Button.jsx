const Button = ({ buttonText, onClick }) => {
  return (
    <button
      className="bg-btn-primary shadow-custom-btn2 text-white w-full rounded-3xl size-10 hover:opacity-80 mt-4"
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default Button;
