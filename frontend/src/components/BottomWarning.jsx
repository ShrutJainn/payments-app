import { Link } from "react-router-dom";

function BottomWarning({ text, linkText, link }) {
  return (
    <div className=" text-sm text-center mt-2">
      {text} <Link to={link}>{linkText}</Link>
    </div>
  );
}

export default BottomWarning;
