import { motion } from "framer-motion";
import { Edit, User } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils";
import { useState } from "react";
import Input from "../components/Input";

const DashboardPage = () => {
  const { user, logout, updateProfile, updatePassword, isLoading, error } =
    useAuthStore();
  const [editMode, setEditMode] = useState(false);
  const [isNameLoading, setIsNameLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const [name, setName] = useState(user?.name || "");
  const [nameError, setNameError] = useState(null);
  const [nameSuccess, setNameSuccess] = useState(null);

  // Edit password form state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);

  const handleLogout = () => logout();

  const handleEditClick = () => {
    setEditMode(true);
    setName(user?.name || "");
    setOldPassword("");
    setNewPassword("");
  };

  const handleCancel = () => {
    setEditMode(false);
    setPasswordError(null);
    setNameSuccess(null);
    setNameError(null);
    setPasswordSuccess(null);
  };

  // Name form submit
  const handleEditProfileSubmit = async (e) => {
    e.preventDefault();
    setIsNameLoading(true);
    if (!name.trim()) {
      setNameError("Name is required");
      setIsNameLoading(false);
      return;
    }
    try {
      await updateProfile(name);
      setNameSuccess("Profile updated successfully");
      setTimeout(() => setEditMode(false), 1000);
    } catch (err) {
      setNameError(err?.response?.data?.message || "Failed to update name");
    } finally {
      setIsNameLoading(false);
    }
  };

  // Password form submit
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsPasswordLoading(true);
    if (!newPassword || newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      setIsPasswordLoading(false);
      return;
    }
    if (!oldPassword) {
      setPasswordError("Old password is required");
      setIsPasswordLoading(false);
      return;
    }
    try {
      await updatePassword(oldPassword, newPassword);
      setPasswordSuccess("Password updated successfully");
      setOldPassword("");
      setNewPassword("");
      setPasswordError(null);
    } catch (err) {
      setPasswordError(
        err?.response?.data?.message || "Failed to update password"
      );
    } finally {
      setIsPasswordLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full mx-auto mt-10 p-8 bg-gray-900/80 backdrop-filter backdro-blur-lg rounded-xl shadow-2xl border border-gray-800"
    >
      <h2 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
        Dashboard
      </h2>
      <p className="text-gray-300 text-center mb-6">
        Welcome to your dashboard
      </p>
      <div className="space-y-6">
        {!editMode ? (
          <>
            <motion.div
              className="p-4 bg-gray-800/50 rounded-lg border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-green-400 mb-3">
                  Profile Information
                </h3>
                <Edit
                  className="w-5 h-5 text-gray-500 hover:text-green-500 transition-colors duration-200 cursor-pointer"
                  onClick={handleEditClick}
                />
              </div>
              <p className="text-gray-300">Name: {user.name}</p>
              <p className="text-gray-300">Email: {user.email}</p>
            </motion.div>
            <motion.div
              className="p-4 bg-gray-800/50 rounded-lg border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold text-green-400 mb-3">
                Account Activity
              </h3>
              <p className="text-gray-300">
                <span className="font-bold">Joined: </span>
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-gray-300">
                <span className="font-bold">Last Login: </span>
                {formatDate(user.lastLogin)}
              </p>
            </motion.div>
          </>
        ) : (
          <>
            {/* Edit Name Form */}
            <motion.div
              className="p-4 bg-gray-800/50 rounded-lg border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-green-400 mb-3">
                Edit Profile
              </h3>
              <form onSubmit={handleEditProfileSubmit} className="space-y-3">
                <div>
                  <label className="block text-gray-400 mb-1">Name</label>
                  <Input
                    icon={User}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                {setNameError && error && (
                  <div className="text-red-400 text-sm">
                    {error && nameError}
                  </div>
                )}
                {setNameSuccess && (
                  <div className="text-green-400 text-sm">{nameSuccess}</div>
                )}

                <div className="flex justify-end gap-2 mt-2 ">
                  <button
                    type="submit"
                    className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 font-semibold"
                    disabled={isNameLoading}
                  >
                    {isNameLoading ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </form>
            </motion.div>
            {/* Edit Password Form */}
            <motion.div
              className="p-4 bg-gray-800/50 rounded-lg border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-green-400 mb-3">
                Change Password
              </h3>
              <form onSubmit={handlePasswordSubmit} className="space-y-3">
                <div>
                  <label className="block text-gray-400 mb-1">
                    Old Password
                  </label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                    minLength={6}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                    minLength={6}
                    required
                  />
                </div>
                {setPasswordError && error && (
                  <div className="text-red-400 text-sm">
                    {error && passwordError}
                  </div>
                )}
                {setPasswordSuccess && (
                  <div className="text-green-400 text-sm">
                    {passwordSuccess}
                  </div>
                )}

                <div className="flex mt-2 justify-end">
                  <button
                    type="submit"
                    className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 font-semibold"
                    disabled={isPasswordLoading}
                  >
                    {isPasswordLoading ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </form>
            </motion.div>
            {/* Single Cancel button below forms */}
            <div className="flex justify-center mt-4">
              <button
                type="button"
                className="py-2 px-6 bg-gray-700 text-white rounded hover:bg-gray-800 font-semibold w-full"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-4"
      >
        <motion.button
          className=" w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
        >
          Logout
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;
