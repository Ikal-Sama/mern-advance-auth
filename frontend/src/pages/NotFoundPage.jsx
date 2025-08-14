import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-800/50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8 flex flex-col items-center">
          <h1 className="text-7xl font-extrabold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text select-none">
            404
          </h1>
          <h2 className="text-2xl font-bold mb-2 text-center text-white">
            Page Not Found
          </h2>
          <p className="text-gray-300 mb-6 text-center">
            Sorry, the page you are looking for does not exist or has been
            moved.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold shadow hover:from-green-500 hover:to-emerald-600 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
