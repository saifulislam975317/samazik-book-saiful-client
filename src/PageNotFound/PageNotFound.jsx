import { Link } from "react-router-dom";
import img from "../assets/pageNotFound/pageNotFound.avif";
const PageNotFound = () => {
  return (
    <div className="flex justify-center flex-col items-center mt-4 text-3xl text-bold text-red-600">
      <img className="w-[400px] h-[300px]" src={img} alt="" />
      <h1>Opps! 404. Page Not found. please try again.</h1>
      <Link to="/">
        <button className="btn btn-info">Back To Home</button>
      </Link>
    </div>
  );
};

export default PageNotFound;
