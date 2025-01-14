import { Link } from "react-router-dom";
const BottomWarning = ({ warningText, navigateToText, navigateTo }) => {
  return (
    <div className="text-xs text-center">
      {warningText}
      <Link
        to={navigateTo}
        className="font-inter leading-3 text-link underline hover:opacity-50"
      >
        {navigateToText}
      </Link>
    </div>
  );
};

export default BottomWarning;
