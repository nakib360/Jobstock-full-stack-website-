import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { BiShowAlt, BiHide } from "react-icons/bi";
import AuthContext from "../Authantiation/AuthContext";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const LoginPage = () => {
  const { LogInUser, signInWithGoogle, setShowLoginModel } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    LogInUser(email, password)
      .then((res) => {
        setShowLoginModel(false);
        toast.success("Logged in successfully!");
        axios.post(`${import.meta.env.VITE_API}/jwt`, { user: res?.user?.email }, { withCredentials: true })
          .then(res => {
            //console.log(res);
          })
      })
      .catch((err) => toast.error(err.message));
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((res) => {
        setShowLoginModel(false)
        axios.post(`${import.meta.env.VITE_API}/jwt`, { user: res?.user?.email }, { withCredentials: true })
          .then(res => {
            //console.log(res);
          })

        const user = res?.user;

        axios.post(`${import.meta.env.VITE_API}/users`, {
          displayName: user?.displayName ?? "New User",
          email: user?.email ?? null,
          phoneNumber: user?.phone ?? null,
          gender: user?.gender ?? null,
          password: user?.password ?? null,
          birthDate: user?.date ?? null,
          bio: "",
          avatar: user?.photoURL ?? "",
          social: {
            website: "",
            linkedin: "",
            twitter: "",
            facebook: ""
          },
          privacy: {
            profilePublic: true,
            showEmail: false,
            showPhone: false
          },
          skills: [],
          education: [],
          createdAt: new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
          }),
          updatedAt: new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
          }),
        }, { withCredentials: true })
          .then((res) => {
            //console.log(res);
          })
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative min-w-[50vw]">
        <motion.div
          initial={{ y: 10, scale: 0.8, opacity: 0 }}
          animate={{ y: -10, scale: 1, opacity: 1 }}
          exit={{ y: 10, scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.1, type: "spring", stiffness: 500, damping: 30 }}
          className="bg-gray-300 rounded-2xl shadow-xl p-6 relative"
        >
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Welcome Back
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="px-5 py-3 w-full rounded-xl border border-white/30 bg-white/90 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                className="px-5 py-3 w-full rounded-xl border border-white/30 bg-white/90 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-md pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-10 text-gray-600 cursor-pointer hover:text-emerald-500 transition-all"
              >
                {showPass ? <BiShowAlt size={22} /> : <BiHide size={22} />}
              </span>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 transition-all text-white font-semibold px-6 py-3 rounded-xl shadow-lg"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-400"></div>
            <span className="text-sm text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-400"></div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 w-full bg-white text-gray-700 font-medium px-6 py-3 rounded-xl shadow-md hover:bg-gray-100 transition-all"
          >
            <FcGoogle size={22} />
            <span className="font-medium text-gray-700">Continue with Google</span>
          </button>

          {/* Close Button */}
          <div className="absolute top-5 right-5">
            <IoClose
              onClick={() => setShowLoginModel(false)}
              className="text-red-600 hover:text-red-500 text-xl cursor-pointer"
            />
          </div>
        </motion.div>
      </div>
      <Toaster />
    </div>
  );
};

export default LoginPage;
