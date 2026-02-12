import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen w-full bg-radial-[at_25%_25%] from-red-700 to-red-900 to-75% text-white">
      <div className="relative container mx-auto flex flex-col items-center justify-center gap-4 px-4 py-40">
        <FaHeart className="size-10 animate-pulse text-white" />
        <h1 className="flex items-center justify-center gap-2 text-center text-5xl font-bold">
          Not Found
        </h1>
        <p className="text-center text-lg">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="text-center text-lg text-sm text-white underline hover:cursor-pointer hover:text-red-300"
        >
          Go back to the home page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
