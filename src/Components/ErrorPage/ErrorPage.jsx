import { Link } from "react-router";
import { FaHome } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">

      <div className="text-center max-w-lg">

        <h1 className="text-7xl font-extrabold text-error mb-4">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          Page Not Found
        </h2>

        <p className="text-base sm:text-lg text-base-content/70 mb-6">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="btn bg-teal-600 text-white gap-2"
        >
          <FaHome />
          Back to Home
        </Link>

      </div>

    </div>
  );
};

export default ErrorPage;